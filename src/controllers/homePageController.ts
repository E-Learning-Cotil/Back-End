import { Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class homePageController{
	async get(req: Request, res: Response){
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
			return res.status(404).json("Erro ao carregar os itens da homepage");
        }
    }
}

export default new homePageController();