import { Request, Response, NextFunction } from 'express';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import Cloudinary from '../config/cloudinary';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

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

    async createFile(req: any, res: Response, next: NextFunction){
        const { user: id } = req;
        
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });

        const page = await browser.newPage();

        page.setExtraHTTPHeaders({
            'Authorization': req.headers.authorization
        });

        await page.goto(`${process.env.HOST}/boletim/render-pdf/`, {
            waitUntil: 'networkidle0'
        });

        await page.emulateMediaType('print');

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

        try {
            Cloudinary.uploader.upload(filePath, function(error, result) {
                return res.status(201).json(result.url);
            });
        } catch (error) {
            const err = new InternalError("Erro ao fazer upload do arquivo", 400, error.message);
            return next(err);
        }
    }

    async renderFile(req: any, res: Response){
        const { user: id } = req;

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

        const viewPath = path.join(__dirname, "..", "..", "public", "pdf.ejs");
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