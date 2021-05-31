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

	async list(req: any, res: Response){
        const {idSerie} = req.query;

        if (idSerie) req.query.idSerie = Number(idSerie);

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

	async listByAluno(req: Request, res: Response){
        const {id} = req.params;

        try {
            const {idSerie} = await prisma.alunos.findFirst({
				select: {
					idSerie: true
				}, 
				where: {
					ra: Number(id)
				}
			});

			const result = await prisma.turmas.findMany({
                where: {
                    idSerie: idSerie
                }
            });
            
            return res.json(result);
        } catch (error) {
            return res.status(404).json({error: error.message});
        }
    } 

    async listByProfessor(req: Request, res: Response){
        const {id} = req.params;

        try {
			const result = await prisma.turmas.findMany({
                where: {
                    rgProfessor: id
                }
            });
            
            return res.json(result);
        } catch (error) {
            return res.status(404).json({error: error.message});
        }
    } 
}

export default new turmasController();