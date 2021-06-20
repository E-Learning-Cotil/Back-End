import {Request, Response, NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class materiaisController{
    async listOne(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

        try {
            const result = await prisma.materiais.findFirst({
                where: {
                    id: Number(id)
                }
            });
            
            return res.json(result);
        } catch (error) {
            const err = new InternalError('Falha ao listar um material!', 400, error.message);
            next(err);
        }
    }

    async list(req: any, res: Response, next: NextFunction){
        const {idTopico} = req.query;

        try {

            const results = await prisma.materiais.findMany({
                where: {
                    idTopico: parseInt(idTopico)
                }
            });
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todos os materiais!', 400, error.message);
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
		try {
			await prisma.materiais.create({
				data: {
					...req.body
				}
			});
            
            return res.status(201).json({message: "OK"});
		} catch (error) {
			const err = new InternalError('Falha ao criar um material!', 400, error.message);
            next(err);
		}
	}

    async update(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;
        try {
			await prisma.materiais.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...req.body
                }
            });
            
            return res.status(200).json({message: "OK"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar um material!', 400, error.message);
            next(err);
		}
    }
}

export default new materiaisController();