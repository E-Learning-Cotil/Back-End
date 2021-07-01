import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import B2 from 'easy-backblaze';

import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

const b2 = new B2(process.env.B2_ACCOUNT_ID, process.env.B2_APP_KEY);

class ArquivosProfessorController{
	async list(req: any, res: Response, next: NextFunction){
        const { user: rgProfessor } = req;

		try {
			const results = await prisma.arquivosProfessor.findMany({
				where: {
                    rgProfessor
                }
			});
			
			return res.status(200).json(results);
		} catch (error) {
			const err = new InternalError('Falha ao listar os arquivos de um professor!', 400, error.message);
            next(err);
		}   
    }

	async create(req: any, res: Response, next: NextFunction){
        const { user: rgProfessor } = req;

        try {
			await b2.uploadFile(req.file.path, {
                name: req.file.filename,
                bucket: 'e-learning-storage',
            }, async function( err: any, file: any) {
                const result = await prisma.arquivosProfessor.create({
                    data: {
                        nome: req.file.filename,
                        link: file,
                        rgProfessor
                    }
                })

                return res.status(201).json({link: file, idArquivo: result.id});
            });
		} catch (error) {
			const err = new InternalError('Falha ao hospedar um arquivo!', 400, error.message);
            next(err);
		} 
    }
}

export default new ArquivosProfessorController();