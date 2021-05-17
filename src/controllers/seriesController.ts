import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SeriesController{
    async list(req: Request, res: Response){
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
            return res.status(404).json({error: error.message});
        }
    }

    async create(req: Request, res: Response){
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
            return res.status(404).json({error: error.message});
        }
    }
}
export default new SeriesController();