import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

import encryptPassword from '../utils/encryptPassword';

const prisma = new PrismaClient();

class AlunosController{
    async listOne(req: Request, res: Response){
        try {
			const result = await prisma.alunos.findFirst({
				where: {
                    RA: Number(req.params.id)
                },
                select:{
                    RA: true,
					telefone: true,
					email: true,
					nome: true,
					foto: true,
					idSerie: true                   
                }
			});
			
			return res.status(200).json(result);
		} catch (error) {
			return res.status(404).json({error: error.message});
		} 
    }

	async list(req: any, res: Response){
		const {idSerie, RA} = req.query;
		
        if (idSerie) req.query.idSerie = Number(idSerie);
        if (RA) req.query.RA = Number(RA);

		try {
			const results = await prisma.alunos.findMany({
				where: req.query,
				select:{
                    RA: true,
					telefone: true,
					email: true,
					nome: true,
					foto: true,
					idSerie: true                   
                }
			});
			
			return res.status(200).json(results);
		} catch (error) {
			return res.status(404).json({error: error.message});
		}   
    }

	async create(req: Request, res: Response){
        const senha = await encryptPassword("123456");

		try {
			await prisma.alunos.create({
				data: {
					...req.body,
					senha
				}
			});
            
            return res.status(201).json({message: "OK"});
		} catch (error) {
			return res.status(404).json({error: error.message });
		}
	}

    async update(req: Request, res: Response){
        req.body.senha = await encryptPassword(req.body.senha);
        const {id} = req.params;
        try {
			await prisma.alunos.update({
                where: {
                    RA: Number(id)
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

export default new AlunosController();