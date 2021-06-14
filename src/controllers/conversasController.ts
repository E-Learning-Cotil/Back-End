import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

const cargo = "PROFESSOR";
const identificacao = "123";

class ConversasController{
    async list(req: Request, res: Response, next: NextFunction){

        try {
            let result = [];
            if(cargo === "PROFESSOR"){
                result = await prisma.conversas.findMany({
                    where: {
                        rgProfessor: String(identificacao)
                    },
                    distinct: ['raAluno'],
                    orderBy: {
                        data: 'desc'
                    },
                    select: {
                        raAluno: true,
                        data: true,
                        mensagem: true
                    }
                });
            }else{
                const aluno = await prisma.alunos.findFirst({
                    where: {
                        ra: Number(identificacao)
                    },
                    select:{
                        idSerie: true
                    }
                });

                const turmas = await prisma.turmas.findMany({
                    where: {
                        idSerie: aluno.idSerie 
                    },
                    select: {
                        rgProfessor: true
                    }
                })

                const professoresList = turmas.map(turma => turma.rgProfessor);

                console.log(professoresList);

                for (const prof of professoresList) {
                    const conversas = await prisma.conversas.findFirst({
                        where: {
                            rgProfessor: prof,
                            raAluno: Number(identificacao)
                        },
                        distinct: ['rgProfessor'],
                        orderBy: {
                            data: 'desc'
                        },
                        select: {
                            rgProfessor: true,
                            data: true,
                            mensagem: true
                        }
                    });

                    if(conversas !== null) {
                        result.push(conversas);
                    }else{
                        result.push({rgProfessor: prof, data: null, mensagem: null})
                    }
                }
            }

			
			return res.status(200).json(result);
		} catch (error) {
			const err = new InternalError('Falha ao listar um aluno!', 400, error.message);
            next(err);
		} 
    }

    async create(req: Request, res: Response, next: NextFunction){
        const {mensagem, raAluno, rgProfessor} = req.body;

        const rg = cargo === "PROFESSOR" ? String(identificacao) : rgProfessor;
        const ra = cargo !== "PROFESSOR" ? Number(identificacao) : raAluno;

        try {
            await prisma.conversas.create({
                data: {
                    mensagem,
                    origem: cargo,
                    rgProfessor: rg,
                    raAluno: Number(ra)
                }
            })

            return res.status(201).json({message: "Mensagem criada com sucesso!"});
        } catch (error) {
            const err = new InternalError('Falha ao criar uma mensagem!', 400, error.message);
            next(err);
        }
    }

    async listMessages(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

        const rg = cargo === "PROFESSOR" ? String(identificacao) : id;
        const ra = cargo !== "PROFESSOR" ? Number(identificacao) : id;

        console.log(ra);

        try {
            const result = await prisma.conversas.findMany({
                where: {
                    rgProfessor: rg,
                    raAluno: Number(ra)
                },
                orderBy: {
                    data: 'asc'
                },
                select: {
                    origem: true,
                    data: true,
                    mensagem: true
                }
            })

            return res.status(201).json(result);
        } catch (error) {
            const err = new InternalError('Falha ao carregar as mensagens!', 400, error.message);
            next(err);
        }
    }
}

export default new ConversasController();