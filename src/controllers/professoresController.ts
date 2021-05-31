import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

import encryptPassword from '../utils/encryptPassword';

const prisma = new PrismaClient();

class professoresController{
    async listOne(req: Request, res: Response){
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
            return res.status(404).json({error: error.message});
        }
    }

    async list(req: Request, res: Response){
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
            return res.status(404).json({error: error.message});
        }
    }

    async create(req: Request, res: Response){
        const senha = await encryptPassword("123456");

		try {
			await prisma.professores.create({
				data: {
					...req.body,
					senha
				}
			});
            
            return res.status(201).json({message: "OK"});
		} catch (error) {
			return res.status(404).json({error: error.message });
		}
	}

    async update(req: Request, res: Response){
        req.body.senha = await encryptPassword(req.body.senha);
        const {id} = req.params;
        try {
			await prisma.professores.update({
                where: {
                    rg: id
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

export default new professoresController();