import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class atividadesController{
    async listOne(req: any, res: Response, next: NextFunction){
        const {id} = req.params;
        const { user, role } = req;

        try {
            let result;
            if(role === "PROFESSOR"){
                result = await prisma.atividades.findFirst({
                    where: {
                        id: Number(id)
                    },
                    include:{
                        arquivosAtividades: {
                            include: {
                                arquivoProfessor: true
                            }
                        },
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
                        _count: {
                            select: {
                                atividadesAlunos: true
                            }
                        }
                    }
                });
            }else{
                result = await prisma.atividades.findFirst({
                    where: {
                        id: Number(id)
                    },
                    include:{
                        arquivosAtividades: {
                            include: {
                                arquivoProfessor: true
                            }
                        },
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
                        atividadesAlunos: {
                            where: {
                                raAluno: Number(user)
                            }
                        }
                    }
                });
            }
            
            return res.json(result);
        } catch (error) {
            console.log(error);
            const err = new InternalError('Falha ao listar uma atividade!', 400, error.message);
            next(err);
        }
    }

    async listByRole(req: any, res: Response, next: NextFunction){
        const { user, role } = req;

        try {
            let finalList = [];

            if (role === "PROFESSOR") {
                let atividades = [];
                let testes = [];
                
                const turmas = await prisma.turmas.findMany({
                    where: {
                        rgProfessor: user
                    }
                });

                for(let turma of turmas){
                    const atividadesTmp = await prisma.atividades.findMany({
                        where: {
                            topico: {
                                idTurma: turma.id
                            },
                            dataFim: {
                                gte: new Date()
                            }
                        },
                        include:{
                            arquivosAtividades: true,
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

                    atividades = [...atividades, ...atividadesTmp];
                }

                for(let turma of turmas){
                    const testesTmp = await prisma.testes.findMany({
                        where: {
                            topicos: {
                                idTurma: turma.id
                            },
                            dataFim: {
                                gte: new Date()
                            }
                        },
                        include:{
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

                    testes = [...testes, ...testesTmp];
                }

                const finalAtividades = atividades.filter((ativ: any) => {
                    ativ.tipo = "ATIVIDADE";
                    if(ativ.atividadesAlunos.length === 0) return ativ;
                })

                const finalTestes = testes.filter((test:any) => {
                    test.tipo = "TESTE";
                    if(test.testesAlunos.length === 0) return test;
                })

                finalList = [...finalAtividades, ...finalTestes];

                finalList.sort(( {dataFim: dataFimA}, {dataFim: dataFimB}) => {
                    if (dataFimA > dataFimB) {
                      return 1;
                    }
    
                    if (dataFimA < dataFimB) {
                      return -1;
                    }
    
                    return 0;
                });
            }
            else {
                const {idSerie} = await prisma.alunos.findFirst({
                    where: {
                        ra: Number(user)
                    }
                })

                const atividadesTmp = await prisma.atividades.findMany({    
                    where: {
                        topico: {
                            turma: {
                                idSerie
                            }
                        }
                    },
                    include:{
                        arquivosAtividades: true,
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

                const testesTmp = await prisma.testes.findMany({    
                    where: {
                        topicos: {
                            turma: {
                                idSerie
                            }
                        }
                    },
                    include:{
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

                const atividades = atividadesTmp.filter((ativ: any) => {
                    ativ.tipo = "ATIVIDADE";
                    if(ativ.atividadesAlunos.length === 0) return ativ;
                })

                const testes = testesTmp.filter((test:any) => {
                    test.tipo = "TESTE";
                    if(test.testesAlunos.length === 0) return test;
                })

                finalList = [...atividades, ...testes];

                finalList.sort(( {dataFim: dataFimA}, {dataFim: dataFimB}) => {
                    if (dataFimA > dataFimB) {
                      return 1;
                    }
    
                    if (dataFimA < dataFimB) {
                      return -1;
                    }
    
                    return 0;
                });
            }

            return res.json(finalList);
        } catch (error) {
            const err = new InternalError('Falha ao listar todas as atividades!', 400, error.message);
            next(err);
        }
    }

    async list(req: any, res: Response, next: NextFunction){
		const { idTopico } = req.query;

        try {
            let results = null;

            if (idTopico) {
                results = await prisma.atividades.findMany({
                    where: {
                        idTopico: parseInt(idTopico)
                    },
                    include:{
                        arquivosAtividades: true,
                        topico: {
                            include: {
                                turma: {
                                    include: {
                                        icone: true,
                                        cores: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        dataFim: 'asc'
                    }
                });
            }
            else {
                results = await prisma.atividades.findMany({    
                    include:{
                        arquivosAtividades: true,
                        topico: {
                            include: {
                                turma: {
                                    include: {
                                        icone: true,
                                        cores: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        dataFim: 'asc'
                    }
                });
            }

            if(!results) return res.json("Nenhuma atividade encontrada!");

            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todas as atividades!', 400, error.message);
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        const { nome, conteudo, dataInicio, dataFim, idTopico, arquivos } = req.body;

		try {
            const arquivosAtividades = arquivos.map(arq => {
                return {idArquivoProfessor: arq}
            })

			await prisma.atividades.create({
				data: {
					nome, 
                    conteudo,
                    dataInicio,
                    dataFim,
                    idTopico,
                    arquivosAtividades: {
                        create: arquivosAtividades
                    }
				}
			});
            
            return res.status(201).json({message: "Atividade criada com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar uma atividade!', 400, error.message);
            next(err);
		}
	}

    async update(req: Request, res: Response, next: NextFunction){
        const { nome, conteudo, dataInicio, dataFim, idTopico , arquivos } = req.body;

        const {id} = req.params;

        const arquivosJaCriados = await prisma.arquivosAtividades.findMany({
            where: {
                idAtividade: parseInt(id)
            }
        });

        const arquivosJaCriadosIDs = arquivosJaCriados.map(item => item.id);

        const arquivosParaCriar = arquivos.filter((id: number) => !arquivosJaCriadosIDs.includes(id));
        const arquivosParaExcluir = arquivosJaCriadosIDs.filter((id: number) => !arquivos.includes(id));

        const arquivosParaCriarFormatados = arquivosParaCriar.map(arqId => {
            return {idArquivoProfessor: arqId};
        });

        const arquivosParaExcluirFormatados = arquivosParaExcluir.map(arqId => {
            return {id: arqId};
        });

        try {
			await prisma.atividades.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome, 
                    conteudo,
                    dataInicio,
                    dataFim,
                    arquivosAtividades: {
                        deleteMany: arquivosParaExcluirFormatados,
                        create: arquivosParaCriarFormatados
                    }
                }
            });
            
            return res.status(200).json({message: "Atividade atualizada com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar uma atividade!', 400, error.message);
            next(err);
		}
    }
}

export default new atividadesController();