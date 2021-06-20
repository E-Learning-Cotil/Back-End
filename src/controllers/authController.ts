import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

class AuthController{
    async authenticate(req: Request, res: Response){
        const {user, password, role} = req.body;

        let userHash = null;
        if(role === "PROFESSOR"){
            const prof = await prisma.professores.findFirst({
                where: {
                    rg: String(user)
                },
                select: {
                    senha: true
                }
            });

            if(!prof) return res.status(400).json({error: 'Professor não encontrado'});

            userHash = prof.senha;
        }else if(role === "ALUNO"){
            const aluno = await prisma.alunos.findFirst({
                where: {
                    ra: parseInt(user)
                },
                select: {
                    senha: true
                }
            });

            if(!aluno) return res.status(400).json({error: 'Aluno não encontrado'});

            userHash = aluno.senha;
        }else{
            return res.status(401).json({message: "Cargo incorreto"});
        }

        const isAuthenticated = await bcrypt.compare(password, userHash);

        if(!isAuthenticated) return res.status(401).send({error: 'Senha incorreta'});

        const token = generateToken(user, role);

        return res.status(200).json({token});
    }
}

function generateToken(user, role){
    const token = jwt.sign({user, role}, process.env.SECRET, {
        expiresIn: 86400 // 60 * 60 * 24 = 1 dia
    });

    return token;
}

export default new AuthController();