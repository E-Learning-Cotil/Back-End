import { Response, NextFunction } from 'express';
import fs from 'fs';
import Cloudinary from '../config/cloudinary';
import path from 'path';
import { PrismaClient } from "@prisma/client"
import { InternalError } from '../errors/InternalError';
import PdfTable from 'voilab-pdf-table';
import PdfDocument from 'pdfkit';
import axios from 'axios';

const prisma = new PrismaClient();

class boletimController{
    async get(req: any, res: Response, next: NextFunction){
        const { user: id } = req;

		try {
            const boletim = await boletimQuery(Number(id));

			return res.json(boletim);
		} catch (error) {
			const err = new InternalError('Falha ao carregar o boletim!', 400, error.message);
            next(err);
		}
    }

    async createFile(req: any, res: Response, next){
        const { user: id } = req;
        
        try { 
            //Cria o PDF e a tabela
            const pdf = await new PdfDocument({
                autoFirstPage: true
            });
    
            const table = await new PdfTable(pdf, {
                bottomMargin: 30
            });

            //Busca o logo e as fontes
            const righteousPath = path.join(__dirname, "..", "..", "public", "fonts", "Righteous-Regular.ttf");
            const quicksandPath = path.join(__dirname, "..", "..", "public", "fonts", "Quicksand-Regular.ttf");
            const logoPath = path.join(__dirname, "..", "..", "public", "images", "logo-elearning.png");
    
            //Busca as notas do boletom
            const data = await boletimQuery(Number(id));
    
            //Busca os dados do aluno
            const { nome, foto } = await prisma.alunos.findFirst({
                where: {
                    ra: Number(id)
                },
                select: {
                    nome: true,
                    foto: true
                }
            });
                        
            //Formatações necessárias
            const fileName = Date.now() + "-" + id + ".pdf";
            const filePath = path.join(__dirname, "..", "..", "tmp", fileName);
            const fotoBuffer = await fetchImage(foto);

            //Adiciona os textos e as imagens
            pdf
                .image(logoPath, 75, 50, {
                    fit: [40, 40],
                    align: 'center',
                    valign: 'center'
                })
                .font(righteousPath)
                .fontSize(25)
                .text('E-Learning', 120, 53)
                .fontSize(16)
                .font(quicksandPath)
                .text(nome, 500 - (nome.length*11) , 60)
                .image(fotoBuffer, 500, 50, {
                    width: 40,
                    height: 40,
                    align: 'center',
                    valign: 'center'
                })
                .font(righteousPath)
                .text('\n')
                .fontSize(20)
                .text('Boletim', 70)

            //Cria a tabela
            await table
                .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                    column: 'nome'
                }))
                .onHeaderAdd(tb => {
                    pdf
                    .font(righteousPath)
                    .fontSize(12)
                    .fillColor('#000')
                })
                .onHeaderAdded(tb => {
                    tb.pdf
                        .font(quicksandPath)
                        .fillColor('#555')
                })
                .setColumnsDefaults({
                    headerBorder: 'TBLR',
                    headerPadding: [10],
                    border: 'TBLR',
                    align: 'left',
                    padding: [10],
                })
                .addColumns([
                    {
                        id: 'nome',
                        header: 'Nome da matéria',
                        align: 'left'
                    },
                    {
                        id: 'mediaTestes',
                        header: 'Média dos testes',
                        width: 100
                    },
                    {
                        id: 'mediaAtividades',
                        header: 'Média das atividades',
                        width: 100
                    },
                    {
                        id: 'mediaTurma',
                        header: 'Média Final',
                        width: 100
                    }
                ])
                .onPageAdded(function (tb) {
                    tb.addHeader();
                });
    
            await table.addBody(data);
            
            //Salva o arquivo
            await pdf.pipe(fs.createWriteStream(filePath)); 
            await pdf.end();

            console.log(filePath);
            console.log(id);

            //Faz o upload do arquivo
            Cloudinary.uploader.upload(filePath, function(error, result) {
                if(error) {
                    console.log(error);
                    throw new Error("Erro ao fazer upload do arquivo!");
                }

                return res.status(201).json(result.url);
            });
        } catch (error) {
			const err = new InternalError('Falha ao carregar o boletim!', 400, error.message);
            next(err);
		}
    };
}

async function boletimQuery(id: number){
    const {idSerie} = await prisma.alunos.findFirst({
        select: {
            idSerie: true 
        }, 
        where: {
            ra: id
        }
    });

    const turmas = await prisma.turmas.findMany({
        where: {
            idSerie: idSerie
        }
    });

    const notasPorTurmas = [];

    for (const {id: idTurma, nome} of turmas) {
        let somaAtividades = 0;
        let somaTestes = 0;
        let numAtividades = 0;
        let numTestes = 0;
        
        const atividades = await prisma.atividadesAluno.findMany({
            where: {
                raAluno: id,
                idTurma
            }
        });

        for (const { nota } of atividades) {
            if (nota != null) {
                somaAtividades += Number(nota);
                numAtividades++;
            }
        };
        
        const testes = await prisma.testesAluno.findMany({
            where: {
                raAluno: id,
                idTurma
            }
        });
        
        for (const { nota } of testes) {
            if (nota != null) {
                somaTestes += Number(nota);
                numTestes++;
            }
        };
        
        const mediaAtividades = (somaAtividades/numAtividades) || 0;
        const mediaTestes = (somaTestes/numTestes) || 0;
        const mediaTurma = ((mediaAtividades + mediaTestes) / 2) || 0;
    
        notasPorTurmas.push({nome, mediaAtividades, mediaTestes, mediaTurma});
    }
    
    return notasPorTurmas;
}

async function fetchImage(src) {
    const image = await axios
        .get(src, {
            responseType: 'arraybuffer'
        })
    return image.data;
}

export default new boletimController();