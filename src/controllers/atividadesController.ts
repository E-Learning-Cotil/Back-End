import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class atividadesController{
    async listOne(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

        try {
            const result = await prisma.atividades.findFirst({
                where: {
                    id: Number(id)
                }
            });
            
            return res.json(result);
        } catch (error) {
            const err = new InternalError('Falha ao listar uma atividade!', 400, error.message);
            next(err);
        }
    }

    async list(req: any, res: Response, next: NextFunction){
		const { idTopico } = req.query;

        try {
            let results = null;

            if (idTopico) {
                results = await prisma.atividades.findMany({
                    where: {
                        idTopico: parseInt(idTopico)
                    }
                });
            }
            else {
                results = await prisma.atividades.findMany();
            }

            if(!results) return res.json("Nenhuma atividade encontrada!");

            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todas as atividades!', 400, error.message);
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        const { nome, conteudo, dataInicio, dataFim, idTopico } = req.body;

		try {
			await prisma.atividades.create({
				data: {
					nome, 
                    conteudo,
                    dataInicio,
                    dataFim,
                    idTopico
				}
			});
            
            return res.status(201).json({message: "Atividade criada com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar uma atividade!', 400, error.message);
            next(err);
		}
	}

    async update(req: Request, res: Response, next: NextFunction){
        const { nome, conteudo, dataInicio, dataFim, idTopico } = req.body;

        const {id} = req.params;
        try {
			await prisma.atividades.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome, 
                    conteudo,
                    dataInicio,
                    dataFim
                }
            });
            
            return res.status(200).json({message: "Atividade atualizada com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar uma atividade!', 400, error.message);
            next(err);
		}
    }
}

export default new atividadesController();