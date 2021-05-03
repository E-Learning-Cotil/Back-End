import express from 'express';
import cors from 'cors';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/create", async (req, res) => {
    const result = await prisma.series.create({
        data: {
            curso: "INFORMATICA",
            ano: 2,
            tipo: "MEDIOTECNICO",
            periodo: "NOTURNO"
        },
    })

    console.log(result);

    return res.status(201).json({message: "OK"});
});

app.get('/list', async (req, res) => {
    const results = await prisma.series.findMany({
        where: {
            ano: 2
        }
    });

    return res.json(results);
})

app.listen(3334, () => console.log("Server is running..."));