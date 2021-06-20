import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import encryptPassword from '../utils/encryptPassword';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class AlunosController{
    async listOne(req: Request, res: Response, next: NextFunction){
        try {
			const result = await prisma.alunos.findFirst({
				where: {
                    ra: Number(req.params.id)
                },
                select:{
                    ra: true,
					telefone: true,
					email: true,
					nome: true,
					foto: true,
					idSerie: true                   
                }
			});
			
			return res.status(200).json(result);
		} catch (error) {
			const err = new InternalError('Falha ao listar um aluno!', 400, error.message);
            next(err);
		} 
    }

	async list(req: any, res: Response, next: NextFunction){
		const {idSerie, ra} = req.query;
		
        if (idSerie) req.query.idSerie = Number(idSerie);
        if (ra) req.query.ra = Number(ra);

		try {
			const results = await prisma.alunos.findMany({
				where: req.query,
				select:{
                    ra: true,
					telefone: true,
					email: true,
					nome: true,
					foto: true,
					idSerie: true                   
                }
			});
			
			return res.status(200).json(results);
		} catch (error) {
			const err = new InternalError('Falha ao listar todos os alunos!', 400, error.message);
            next(err);
		}   
    }

	async create(req: Request, res: Response, next: NextFunction){
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
			const err = new InternalError('Falha ao criar um aluno!', 400, error.message);
            next(err);
		}
	}

    async update(req: any, res: Response, next: NextFunction){
        req.body.senha = await encryptPassword(req.body.senha);
        
		const { user } = req;

        try {
			await prisma.alunos.update({
                where: {
                    ra: Number(user)
                },
                data: {
                    ...req.body
                }
            });
            
            return res.status(200).json({message: "OK"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar um aluno!', 400, error.message);
            next(err);
		}
    }

}

export default new AlunosController();