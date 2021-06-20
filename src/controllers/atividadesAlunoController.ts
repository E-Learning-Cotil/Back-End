import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class atividadesAlunoController{
    async listOne(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

        try {
            const result = await prisma.atividadesAluno.findFirst({
                where: {
                    id: Number(id)
                }
            });
            
            return res.json(result);
        } catch (error) {
            const err = new InternalError('Falha ao listar uma atividade feita por um aluno!', 400, error.message);
            next(err);
        }
    }

    async list(req: any, res: Response, next: NextFunction){
		const {raAluno, idAtividade, idTurma, nota} = req.query;

        if (nota) req.query.nota = Number(nota);
        if (raAluno) req.query.raAluno = Number(raAluno);
        if (idAtividade) req.query.idAtividade = Number(idAtividade);
        if (idTurma) req.query.idTurma = Number(idTurma);

        try {
            const results = await prisma.atividadesAluno.findMany({
                where: req.query
            });
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todas atividades feita por todos alunos!', 400, error.message);
            next(err);
        }
    }

    async create(req: any, res: Response, next: NextFunction){
        const { user: raAluno } = req;
        const { link, nome, idAtividade, idTurma } = req.body;

		try {
            const result = await prisma.atividadesAluno.findFirst({
                where:{
                    idAtividade,
                    raAluno
                }
            })

            if(result) return res.status(404).json({message: "Atividade já respondida!"});

			await prisma.atividadesAluno.create({
				data: {
					link,
                    nome,
                    raAluno,
                    idAtividade,
                    idTurma
				}
			});
            
            return res.status(201).json({message: "OK"});
		} catch (error) {
			const err = new InternalError('Falha ao criar uma atividade feita por um aluno!', 400, error.message);
            next(err);
		}
	}

    async update(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const { nota } = req.body;

        try {
			await prisma.atividadesAluno.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nota
                }
            });
            
            return res.status(200).json({message: "OK"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar uma atividade feita por um aluno!', 400, error.message);
            next(err);
		}
    }
}

export default new atividadesAlunoController();