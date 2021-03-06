import {Request, Response, NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class testesController{
    async listOne(req: any, res: Response, next: NextFunction){
        const {id} = req.params;
        const {user, role} = req

        try {
            let whereRole = {};
            if(role === "ALUNO"){
                whereRole = {
                    raAluno: Number(user),
                    idTeste: Number(id)
                };
            }

            const result = await prisma.testes.findFirst({
                where: {
                    id: Number(id)
                },
                include: {
                    testesAlunos: {
                        where: whereRole
                    },
                    topicos: {
                        include: {
                            turma: {
                                include: {
                                    cores: true,
                                    icone: true
                                }
                            }
                        }
                    }
                }
            });
            
            return res.json(result);
        } catch (error) {
            const err = new InternalError('Falha ao listar um teste!', 400, error.message); 
            next(err);
        }
    }

    async list(req: any, res: Response, next: NextFunction){
		const { idTopico } = req.query;

        try {
            let results = null;

            if(idTopico){
                results = await prisma.testes.findMany({
                    where: {
                        idTopico: parseInt(idTopico)
                    }
                });
            }else{
                results = await prisma.testes.findMany();
            }

            if(!results) return res.json("Nenhum teste encontrado!");
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todos os testes!', 400, error.message); 
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        const {conteudo, dataInicio, dataFim, idTopico, nome} = req.body;

		try {
			await prisma.testes.create({
				data: {
					conteudo, 
                    dataInicio, 
                    dataFim, 
                    idTopico,
                    nome
				}
			});
            
            return res.status(201).json({message: "Teste criado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar um teste!', 400, error.message); 
            next(err);
		}
	}

    async update(req: Request, res: Response, next: NextFunction){
        const {conteudo, dataInicio, dataFim, nome } = req.body;

        const {id} = req.params;

        try {
			await prisma.testes.update({
                where: {
                    id: Number(id)
                },
                data: {
                    conteudo, 
                    dataInicio, 
                    dataFim,
                    nome
                }
            });
            
            return res.status(200).json({message: "Teste atualizado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar um teste!', 400, error.message); 
            next(err);
		}
    }
}

export default new testesController();