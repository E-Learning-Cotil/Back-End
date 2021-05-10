import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SeriesController{
    async list(req: Request, res: Response){
        try {
            const results = await prisma.series.findMany({
                where: req.query
            });
            
            return res.json(results);
        } catch (error) {
            return res.status(404).json({error: error.message});
        }
    }

    async create(req: Request, res: Response){
        try {
            await prisma.series.create({
                data: req.body
            });

            return res.status(201).json({message: "OK"});
        } catch (error) {
            return res.status(404).json({error: error.message});
        }
    }
}
export default new SeriesController();