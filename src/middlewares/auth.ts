import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticate(req: any, res: Response, next: NextFunction){
    if(!req.headers) return res.status(401).send({error: "Sem headers"});
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).send({error: "Token obrigatório!"});

    const parts = authHeader.split(' ');

    if(parts.length !== 2) return res.status(401).send({error: "Token mal formatado!"});
    
    const [scheme, token] = parts;     

    if(!/^Bearer$/i.test(scheme)) 
        return res.status(401).send({error: "Token error"});

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send({error: 'Token inválido!'})
        }

        req.user = decoded.user;
        req.role = decoded.role;

        return next();
    });
}

export default authenticate;