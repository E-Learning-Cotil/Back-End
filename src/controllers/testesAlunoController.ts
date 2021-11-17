import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class testesAlunoController{
    async listOne(req: any, res: Response, next: NextFunction){
        const {id} = req.params;
        const {user} = req;

        try {
            const result = await prisma.testesAluno.findFirst({
                where: {
                    id: Number(id),
                    raAluno: Number(user)
                }
            });
            
            return res.json(result);
        } catch (error) {
            const err = new InternalError('Falha ao listar um teste feito por um aluno!', 400, error.message); 
            next(err);
        }
    }

    async list(req: any, res: Response, next: NextFunction){
		const {raAluno, idTeste, idTurma, nota} = req.query;

        if (nota) req.query.nota = Number(nota);
        if (raAluno) req.query.raAluno = Number(raAluno);
        if (idTeste) req.query.idTeste = Number(idTeste);
        if (idTurma) req.query.idTurma = Number(idTurma);

        try {
            const results = await prisma.testesAluno.findMany({
                where: req.query
            });
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todos os testes feitos por alunos!', 400, error.message);
            next(err);
        }
    }

    async create(req: any, res: Response, next: NextFunction){
        const {idTeste, idTurma, nota} = req.body;
        const {user: raAluno} = req;

		try {
            const result = await prisma.testesAluno.findFirst({
                where:{
                    idTeste,
                    raAluno: parseInt(raAluno)
                }
            })

            if(result) return res.status(404).json({message:"Teste já respondido!"});

			await prisma.testesAluno.create({
				data: {
					nota,
                    idTeste,
                    idTurma,
                    raAluno: parseInt(raAluno)
				}
			});
            
            return res.status(201).json({message: "Teste aluno criado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar um teste feito por um aluno!', 400, error.message); 
            next(err);
		}
	}

    async update(req: Request, res: Response, next: NextFunction){
        const {nota} = req.body;
        const {id} = req.params;

        try {
			await prisma.testesAluno.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nota
                }
            });
            
            return res.status(200).json({message: "Teste aluno atualizado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar um teste feito por um aluno!', 400, error.message); 
            next(err);
		}
    }
}

export default new testesAlunoController();