import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class testesAlunoController{
    async listOne(req: Request, res: Response){
        const {id} = req.params;

        try {
            const result = await prisma.testesAluno.findFirst({
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
            return res.status(404).json({error: error.message});
        }
    }

    async create(req: Request, res: Response){
        const {idTeste, raAluno} = req.body;

		try {
            const result = await prisma.testesAluno.findFirst({
                where:{
                    idTeste,
                    raAluno
                }
            })

            if(result) return res.status(404).json({message:"Teste já respondido!"});

			await prisma.testesAluno.create({
				data: {
					...req.body
				}
			});
            
            return res.status(201).json({message: "OK"});
		} catch (error) {
			return res.status(404).json({error: error.message });
		}
	}

    async update(req: Request, res: Response){
        const {id} = req.params;
        try {
			await prisma.testesAluno.update({
                where: {
                    id: Number(id)
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

export default new testesAlunoController();