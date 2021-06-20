import { Request, Response, NextFunction } from 'express';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import B2 from 'easy-backblaze';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();
const b2 = new B2(process.env.B2_ACCOUNT_ID, process.env.B2_APP_KEY);

class boletimController{
    async get(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

		try {
            const boletim = await boletimQuery(Number(id));

			return res.json(boletim);
		} catch (error) {
			const err = new InternalError('Falha ao carregar o boletim!', 400, error.message);
            next(err);
		}
    }

    async createFile(req: Request, res: Response){
        const {id} = req.params;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(`${process.env.HOST}/boletim/render-pdf/${id}`, {
            waitUntil: 'networkidle0'
        });

        const fileName = `${id}-Boletim.pdf`;
        const filePath = path.join(__dirname, "..", "..", "tmp", fileName);

        await page.pdf({
            path: filePath,
            printBackground: true,
            format: 'a4',
            margin: {
                top: "25px",
                bottom: "25px",
                left: "25px",
                right: "25px"
            }
        });

        await browser.close();

        b2.uploadFile(filePath, {
            name: fileName,
            bucket: 'e-learning-storage',
        }, function(err: any, file: any) {
            try {
                return res.status(200).json(file);
            } catch (error) {
                return res.status(404).json("Erro ao fazer upload do arquivo")
            }
        });
    }

    async renderFile(req: Request, res: Response){
        const {id} = req.params;

        const {nome: name, ra, foto: img} = await prisma.alunos.findFirst({
            where: {
                ra: parseInt(id)
            },
            select: {
                nome: true,
                ra: true,
                foto: true
            }
        });
        
        const boletim = await boletimQuery(Number(id));
        
        const dados = {
            name, 
            ra,
            img,
            boletim
        };

        const viewPath = path.join(__dirname, "..", "view", "pdf.ejs");
        ejs.renderFile(viewPath, dados, (err, html) => {
            if(err) {
                return res.send(err);
            }

            return res.send(html);
        });
    }
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

export default new boletimController();