import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class materiaisController{
    async listOne(req: Request, res: Response){
        const {id} = req.params;

        try {
            const result = await prisma.materiais.findFirst({
                where: {
                    id: Number(id)
                }
            });
            
            return res.json(result);
        } catch (error) {
            return res.status(404).json({error: error.message});
        }
    }

    async list(req: any, res: Response){
		const {idTopico} = req.query;

        if (idTopico) req.query.idTopico = Number(idTopico);

        try {
            const results = await prisma.materiais.findMany({
                where: req.query
            });
            
            return res.json(results);
        } catch (error) {
            return res.status(404).json({error: error.message});
        }
    }

    async create(req: Request, res: Response){
		try {
			await prisma.materiais.create({
				data: {
					...req.body
				}
			});
            
            return res.status(201).json({message: "OK"});
		} catch (error) {
			return res.status(404).json({error: error.message });
		}
	}

    async update(req: Request, res: Response){
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
			return res.status(404).json({error: error.message });
		}
    }
}

export default new materiaisController();