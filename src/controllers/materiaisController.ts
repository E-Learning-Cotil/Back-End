import {Request, Response, NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class materiaisController{
    async listOne(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

        try {
            const result = await prisma.materiais.findFirst({
                where: {
                    id: Number(id)
                },
                include: {
                    arquivosMateriais: {
                        include: {
                            arquivoProfessor: true
                        }
                    },
                    topico: {
                        select: {
                            turma: {
                                select: {
                                    nome: true,
                                    cores: true,
                                    icone: true
                                }
                            }
                        }
                    }
                }
            });
            
            return res.json(result);
        } catch (error) {
            const err = new InternalError('Falha ao listar um material!', 400, error.message);
            next(err);
        }
    }

    async list(req: any, res: Response, next: NextFunction){
        const { idTopico } = req.query;

        try {

            let results = null;

            if (idTopico) {
                results = await prisma.materiais.findMany({
                    where: {
                        idTopico: parseInt(idTopico)
                    },
                    include:{
                        arquivosMateriais: true
                    }
                });
            }
            else {
                results = await prisma.materiais.findMany({
                    include:{
                        arquivosMateriais: true
                    }
                });
            }

            if(!results) return res.json("Nenhum material encontrado!");

            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todos os materiais!', 400, error.message);
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        const { conteudo, nome, idTopico, arquivos } = req.body;

		try {
            const arquivosMateriais = arquivos.map(arq => {
                return {idArquivoProfessor: arq}
            })

			await prisma.materiais.create({
				data: {
					conteudo,
                    nome,
                    idTopico,
                    arquivosMateriais: {
                        create: arquivosMateriais
                    }
				},
			});
            
            return res.status(201).json({message: "Material criado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar um material!', 400, error.message);
            next(err);
		}
	}

    async update(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;

        const { conteudo, nome, arquivos } = req.body;

        const arquivosJaCriados = await prisma.arquivosMateriais.findMany({
            where: {
                idMaterial: parseInt(id)
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
			await prisma.materiais.update({
                where: {
                    id: Number(id)
                },
                data: {
                    conteudo,
                    nome,
                    arquivosMateriais: {
                        deleteMany: arquivosParaExcluirFormatados,
                        create: arquivosParaCriarFormatados
                    }
                }
            });

            // await prisma.arquivosMateriais.createMany({
            //         data: arquivosParaExcluirFormatados
            // })
            
            return res.status(200).json({message: "Material atualizado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar um material!', 400, error.message);
            next(err);
		}
    }
}

export default new materiaisController();