import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class homePageController{
	async get(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;
        const {amount = 6} = req.query;

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
                    idSerie
                }
            });

            let array = [];

            for (const {id: idTurma} of turmas) {

                const topicos = await prisma.topicos.findMany({
                    where : {
                        idTurma
                    }
                });

                for (const {id: idTopico} of topicos) {
                    
                    const atividades = await prisma.atividades.findMany({
                        where : {
                            idTopico
                        }
                    });

                    const testes = await prisma.testes.findMany({
                        where : {
                            idTopico
                        }
                    });

                    array = [...array, ...atividades, ...testes];
                }
            }

            array.sort(( {dataInicio: dataInicioA}, {dataInicio: dataInicioB}) => {
                if (dataInicioA > dataInicioB) {
                  return 1;
                }

                if (dataInicioA < dataInicioB) {
                  return -1;
                }

                return 0;
            });

            const response = {turmas: turmas.slice(0, Number(amount)), atividades: array.slice(0, Number(amount))}

            return res.json(response);

        } catch (error) {
			const err = new InternalError('Falha ao carregar os itens da página principal', 400, error.message);
            next(err);
        }
    }
}

export default new homePageController();