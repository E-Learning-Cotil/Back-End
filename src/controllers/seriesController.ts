import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SeriesController{
    async create(req, res){
        const result = await prisma.series.create({
            data: {
                curso: "GEODESIA",
                ano: 2,
                tipo: "MEDIOTECNICO",
                periodo: "NOTURNO"
            },
        })
    
        console.log(result);
    
        return res.status(201).json({message: "OK"});
    }

    async list(req, res){
        const results = await prisma.series.findMany({
            where: {
                ano: 2
            }
        });
    
        return res.json(results);
    }
}

export default new SeriesController();