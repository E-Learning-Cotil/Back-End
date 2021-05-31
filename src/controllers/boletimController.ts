import { Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class boletimController{
    async get(req: Request, res: Response){
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
			return res.status(404).json("Erro ao gerar o boletim");
		}
    }
}

export default new boletimController();