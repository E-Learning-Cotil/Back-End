import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class turmasController{
    async listOne(req: Request, res: Response){
        const {id} = req.params;
        
        try {
            const result = await prisma.turmas.findFirst({
                where: {
                    id: Number(id)
                }
            });
            
            return res.json(result);
        } catch (error) {
            return res.status(404).json({error: error.message});
        }
    }

	async list(req: Request, res: Response){
        try {
            const results = await prisma.turmas.findMany({
                where: req.query
            });
            
            return res.json(results);
        } catch (error) {
            return res.status(404).json({error: error.message});
        }
    }

	async create(req: Request, res: Response){
		try {
			await prisma.turmas.create({
				data: {
					...req.body
				}
			});
            
            return res.status(201).json({message: "OK"});
		} catch (error) {
			return res.status(404).json({error: error.message });
		}
	}
}

export default new turmasController();