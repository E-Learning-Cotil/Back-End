import {Request, Response, NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';

import encryptPassword from '../utils/encryptPassword';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class professoresController{
    async listOne(req: Request, res: Response, next: NextFunction){
        try {
            const results = await prisma.professores.findFirst({
                where: {
                    rg: req.params.id
                },
                select: {
                    rg: true,
                    telefone: true,
                    email: true,
                    nome: true,
                    foto: true
                }
            });
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar um professor!', 400, error.message);
            next(err);
        }
    }

    async list(req: Request, res: Response, next: NextFunction){
        try {
            const results = await prisma.professores.findMany({
                where: req.query,
                select: {
                    rg: true,
                    telefone: true,
                    email: true,
                    nome: true,
                    foto: true
                }
            });
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todos os professores!', 400, error.message);
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        const {telefone, email, nome, rg, foto} = req.body;

        const senha = await encryptPassword("123456");

		try {
			await prisma.professores.create({
				data: {
					email,
                    rg,
                    nome,
                    telefone,
                    foto,
					senha
				}
			});
            
            return res.status(201).json({message: "Professor criado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao criar um professor!', 400, error.message);
            next(err);
		}
	}

    async update(req: any, res: Response, next: NextFunction){
        req.body.senha = await encryptPassword(req.body.senha);

        const {senha, telefone, email, nome, foto} = req.body;

        const { user: id } = req;

        try {
			await prisma.professores.update({
                where: {
                    rg: String(id)
                },
                data: {
                    email,
                    nome,
                    telefone,
                    foto,
					senha
                }
            });
            
            return res.status(200).json({message: "Professor atualizado com sucesso!"});
		} catch (error) {
			const err = new InternalError('Falha ao atualizar um professor!', 400, error.message);
            next(err);
		}
    }

}

export default new professoresController();