import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class homePageController{
	async get(req: any, res: Response, next: NextFunction){
        const { user: id } = req;
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
                },
                include: {
                    cores: true,
                    icone: true,
                    professor: {
                        select: {
                            nome: true
                        }
                    }
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
                        },
                        include: {
                            topico: {
                                include: {
                                    turma: {
                                        include: {
                                            icone: true,
                                            cores: true
                                        }
                                    }
                                }
                            },
                            atividadesAlunos: true
                        },
                        orderBy: {
                            dataFim: 'asc'
                        }
                    });

                    const atividadesFiltradas = atividades.filter((ativ: any) => {
                        ativ.tipo = "ATIVIDADE";

                        if(ativ.atividadesAlunos.length === 0) return ativ;
                    })

                    const testes = await prisma.testes.findMany({
                        where : {
                            idTopico
                        },
                        include: {
                            topicos: {
                                include: {
                                    turma: {
                                        include: {
                                            icone: true,
                                            cores: true
                                        }
                                    }
                                }
                            },
                            testesAlunos: true
                        },
                        orderBy: {
                            dataFim: 'asc'
                        }
                    });

                    const testesFiltrados = testes.filter((teste: any) => {
                        teste.tipo = "TESTE"
                        if(teste.testesAlunos.length === 0) return teste;
                    })

                    array = [...array, ...atividadesFiltradas, ...testesFiltrados];
                }
            }

            array.sort(( {dataFim: dataFimA}, {dataFim: dataFimB}) => {
                if (dataFimA > dataFimB) {
                  return 1;
                }

                if (dataFimA < dataFimB) {
                  return -1;
                }

                return 0;
            });

            const response = {turmas: turmas.slice(0, Number(amount)), atividades: array.slice(0, Number(amount))}

            return res.json(response);

        } catch (error) {
			const err = new InternalError('Falha ao carregar os itens da p??gina principal', 400, error.message);
            next(err);
        }
    }
}

export default new homePageController();