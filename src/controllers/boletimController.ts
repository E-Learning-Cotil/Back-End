import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class boletimController{
    async get(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

		try {
			const {idSerie} = await prisma.alunos.findFirst({
				select: {
					idSerie: true
				}, 
				where: {
					ra: Number(id)
				}
			});

			const turmas = await prisma.turmas.findMany({
                where: {
                    idSerie: idSerie
                }
            });

            const notasPorTurmas = [];

            for (const {id: idTurma, nome} of turmas) {
                let soma = 0;
                let alunos = 0;
                
                const atividades = await prisma.atividadesAluno.findMany({
                    where: {
                        raAluno: Number(id),
                        idTurma
                    }
                });

				for (const { nota } of atividades) {
					if (nota != null) {
                        soma += Number(nota);
                        alunos++;
                    }
				};
                
                const testes = await prisma.testesAluno.findMany({
                    where: {
                        raAluno: Number(id),
                        idTurma
                    }
                });
                
                for (const { nota } of testes) {
					if (nota != null) {
                        soma += Number(nota);
                        alunos++;
                    }
				};
                
                const media = (soma/alunos);
                console.log("Média da turma " + nome + ": " + media);
			
                notasPorTurmas.push({nome, media});
            }
            
			return res.json(notasPorTurmas);
		} catch (error) {
			const err = new InternalError('Falha ao carregar o boletim!', 400, error.message);
            next(err);
		}
    }
}

export default new boletimController();