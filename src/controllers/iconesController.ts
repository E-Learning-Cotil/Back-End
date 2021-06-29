import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class IconesController{
    async list(req: Request, res: Response, next: NextFunction){
        try {
			const result = await prisma.icones.findMany();
			
			return res.status(200).json(result);
		} catch (error) {
			const err = new InternalError('Falha ao listar ícones!', 400, error.message);
            next(err);
		}
    }

	async create(req: Request, res: Response, next: NextFunction){
        const { link } = req.body;

		try {
			await prisma.icones.create({
				data: {
					link
				}
			});
            
            return res.status(201).json({message: "Ícone criado!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar um ícone!', 400, error.message);
            next(err);
		}
	}
}

export default new IconesController();