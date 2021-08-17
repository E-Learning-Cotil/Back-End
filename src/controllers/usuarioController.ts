import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import { InternalError } from '../errors/InternalError';

const prisma = new PrismaClient();

class UsuarioController{
    async list(req: any, res: Response, next: NextFunction){
        const {user} = req;

        let role;
        if(typeof user == 'string') role = "PROFESSOR";
        else role = "ALUNO";

        try {
            let result;

            if(role == "PROFESSOR"){
                result = await prisma.professores.findFirst({
                    where: {
                        rg: String(user)
                    },
                    select:{
                        rg: true,
                        foto: true,
                        nome: true,
                        telefone: true,
                        email: true                  
                    }
                });
            }else{
                result = await prisma.alunos.findFirst({
                    where: {
                        ra: Number(user)
                    },
                    select:{
                        ra: true,
                        foto: true,
                        nome: true,
                        telefone: true,
                        email: true                  
                    }
                });
            }

            result.id = result.rg || result.ra;
            result.rg = undefined;
            result.ra = undefined;
            result.role = role;
			
			return res.status(200).json(result);
		} catch (error) {
			const err = new InternalError('Falha ao listar um aluno!', 400, error.message);
            next(err);
		} 
    }


}

export default new UsuarioController();