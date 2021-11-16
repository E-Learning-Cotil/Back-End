import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import Cloudinary from '../config/cloudinary';

import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

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
            Cloudinary.uploader.upload(req.file.path, async function(error, result) {
                const arquivoProfessor = await prisma.arquivosProfessor.create({
                    data: {
                        nome: req.file.filename,
                        link: result.url,
                        rgProfessor
                    }
                })

                return res.status(201).json({link: result.url, idArquivo: arquivoProfessor.id, name: req.file.filename});
            });
		} catch (error) {
			const err = new InternalError('Falha ao hospedar um arquivo!', 400, error.message);
            next(err);
		} 
    }
}

export default new ArquivosProfessorController();
