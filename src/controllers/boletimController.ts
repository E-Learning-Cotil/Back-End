import { Response, NextFunction } from 'express';
import fs from 'fs';
import Cloudinary from '../config/cloudinary';
import path from 'path';
import { PrismaClient } from "@prisma/client"
import { InternalError } from '../errors/InternalError';
import ejs from 'ejs';
import pdf from 'html-pdf';
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

        try{
            const filePath = path.join(__dirname, "..", "..", "tmp", `Boletim-${id}.pdf`);
            const templatePath = path.join(__dirname, "..", "..", "public", "template.ejs");

            const notas = await boletimQuery(Number(id));
    
            const { nome, foto } = await prisma.alunos.findFirst({
                where: {
                    ra: Number(id)
                },
                select: {
                    nome: true,
                    foto: true
                }
            });
    
            const info = { notas, nome, foto };

            console.log(info);

            ejs.renderFile(templatePath, info, (err, html) => {
                if(err) {
                    throw new Error(err.message);
                }
    
                const options = {
                    height: "11.25in",
                    width: "8.5in",
                    header: {
                        height: "20mm"
                    },
                    footer: {
                        height: "20mm"
                    }
                }
    
                pdf.create(html, options).toFile(filePath, (err, data) => {
                    if (err) {
                        throw new Error(err.message);
                    }
    
                    Cloudinary.uploader.upload(filePath, {format: 'pdf'}, function(err, result) {
                        if(err) {
                            console.log(err);
                            throw new Error(err.message);
                        }
            
                        return res.status(201).json(result.url);
                    });
                })
            })
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

export default new boletimController();