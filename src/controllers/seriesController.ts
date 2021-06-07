import {Request, Response, NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class SeriesController{
    async list(req: Request, res: Response, next: NextFunction){
        try {
            const results = await prisma.series.findMany({
                where: req.query,
                include: {
                    _count: {
                        select: {turmas: true}
                    }
                }
            });
            
            return res.json(results);
        } catch (error) {
            const err = new InternalError('Falha ao listar todas as séries!', 400, error.message);
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        const {curso, tipo, periodo} = req.body;
        
        let siglaCurso;
        switch (curso) {
            case 'ENFERMAGEM':
                siglaCurso = 'ENF';
                break;

            case 'EDIFICACOES':
                siglaCurso = 'EDF';
                break;
            
            case 'GEODESIA':
                siglaCurso = 'GEO';
                break;

            case 'INFORMATICA':
                siglaCurso = 'INF';
                break;
                    
            case 'MECANICA':
                siglaCurso = 'MEC';
                break;

            case 'QUALIDADE':
                siglaCurso = 'QLD';
                break;
        }

        let siglaTipo;
        if(tipo === "TECNICO"){
            siglaTipo = "CT";
        }else{
            siglaTipo = "M";
        }

        let siglaPeriodo = periodo[0];

        const sigla = `${siglaTipo}-${siglaCurso}${siglaPeriodo}`;

        try {
            await prisma.series.create({
                data: {
                    ...req.body,
                    sigla
                }
            });

            return res.status(201).json({message: "OK"});
        } catch (error) {
            const err = new InternalError('Falha ao criar uma nova série!', 400, error.message); 
            next(err);
        }
    }
}
export default new SeriesController();