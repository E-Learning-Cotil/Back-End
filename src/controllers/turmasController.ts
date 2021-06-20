import {NextFunction, Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class turmasController{
    async listOne(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

        try {
            const result = await prisma.turmas.findFirst({
                where: {
                    id: Number(id)
                }
            });
            
            return res.json(result);
        } catch (error) {
            const err = new InternalError('Falha ao listar uma turma!', 400, error.message); 
            next(err);
        }
    }

	async list(req: any, res: Response, next: NextFunction){
        const {idSerie} = req.query;

        if (idSerie) req.query.idSerie = Number(idSerie);

        try {
            const results = await prisma.turmas.findMany({
                where: req.query
            });
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar as turmas!', 400, error.message); 
            next(err);
        }
    }

    async listByRole(req: any, res: Response, next: NextFunction){
        const { user: id, role } = req;

        if (role === 'PROFESSOR') {
            try {
                const result = await prisma.turmas.findMany({
                    where: {
                        rgProfessor: String(id)
                    }
                });
                
                return res.json(result);
            } catch (error) {
                const err = new InternalError('Falha ao listar as turmas filtrando por professor!', 400, error.message); 
                next(err);
            }
        }
        else if (role === 'ALUNO') {
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
                const err = new InternalError('Falha ao listar as turmas filtrando por aluno!', 400, error.message); 
                next(err);
            }
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        const { nome, icone, corPrim, corSec, idSerie, rgProfessor } = req.body;

        try {
            await prisma.turmas.create({
                data: {
                    nome,
                    icone,
                    corPrim,
                    corSec,
                    idSerie,
                    rgProfessor
                }
            });
            
            return res.status(201).json({message: "OK"});
        } catch (error) {
            const err = new InternalError('Falha ao criar uma turma!', 400, error.message); 
            next(err);
        }
    }
}

export default new turmasController();