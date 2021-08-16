import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

class AuthController{
    async authenticate(req: Request, res: Response){
        const {email, password, role} = req.body;

        let userHash = null;
        let user = null;
        let userId = null;
        if(role === "PROFESSOR"){
            const prof = await prisma.professores.findFirst({
                where: {
                    email
                },
                select: {
                    senha: true,
                    rg: true,
                    foto: true,
                    nome: true,
                    telefone: true,
                    email: true
                }
            });

            if(!prof) return res.status(400).json({error: 'Professor não encontrado'});

            user = prof;
            userId = prof.rg;
            userHash = prof.senha;
        }else if(role === "ALUNO"){
            const aluno = await prisma.alunos.findFirst({
                where: {
                    email
                },
                select: {
                    senha: true,
                    ra: true,
                    foto: true,
                    nome: true,
                    telefone: true,
                    email: true,
                    serie: true
                }
            });

            if(!aluno) return res.status(400).json({error: 'Aluno não encontrado'});

            user = aluno;
            userId = aluno.ra;
            userHash = aluno.senha;
        }else{
            return res.status(401).json({message: "Cargo incorreto"});
        }

        user.senha = undefined;

        const isAuthenticated = await bcrypt.compare(password, userHash);

        if(!isAuthenticated) return res.status(401).send({error: 'Senha incorreta'});

        const token = generateToken(userId, role);

        return res.status(200).json({token, user});
    }
}

function generateToken(user, role){
    const token = jwt.sign({user, role}, process.env.SECRET, {
        expiresIn: 86400 // 60 * 60 * 24 = 1 dia
    });

    return token;
}

export default new AuthController();