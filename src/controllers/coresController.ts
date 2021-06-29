import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class CoresController{
    async list(req: Request, res: Response, next: NextFunction){
        try {
			const result = await prisma.cores.findMany();
			
			return res.status(200).json(result);
		} catch (error) {
			const err = new InternalError('Falha ao listar paletas de cor!', 400, error.message);
            next(err);
		}
    }

	async create(req: Request, res: Response, next: NextFunction){
        const { corPrim, corSec } = req.body;

		try {
			await prisma.cores.create({
				data: {
					corPrim,
                    corSec
				}
			});
            
            return res.status(201).json({message: "Paleta de cores criada!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar uma paleta de cores!', 400, error.message);
            next(err);
		}
	}
}

export default new CoresController();