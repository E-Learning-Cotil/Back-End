import { InternalError } from './../errors/InternalError';
import {NextFunction, Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class topicosController{
    async listOne(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

        try {
            const result = await prisma.topicos.findFirst({
                where: {
                    id: Number(id)
                },
                include: {
                    testes: true,
                    atividades: true,
                    Materiais: true,
                    turma: {
                        select: {
                            nome: true,
                            icone: true,
                            cores: true
                        }
                    }
                }
            });
            
            return res.json(result);
        } catch (error) {
            const err = new InternalError('Falha ao listar um tópico!', 400, error.message); 
            next(err);
        }
    }

    async list(req: any, res: Response, next: NextFunction){
		const {idTurma} = req.query;

        if (idTurma) req.query.idTurma = Number(idTurma);

        try {
            const results = await prisma.topicos.findMany({
                where: req.query
            });
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todos os tópicos!', 400, error.message); 
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        const {nome, descricao, idTurma} = req.body;

		try {
			await prisma.topicos.create({
				data: {
					nome,
                    descricao,
                    idTurma
				}
			});
            
            return res.status(201).json({message: "Tópico criado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar um tópico!', 400, error.message); 
            next(err);
		}
	}
}

export default new topicosController();