import {Request, Response, NextFunction} from 'express';

async function basicAuth(req: Request, res: Response, next: NextFunction){
    if(!req.headers.basic_token){
        res.status(404).json({message: "Token obrigatório!"});
    }else{
        if(req.headers.basic_token !== process.env.BASIC_TOKEN){
            res.status(404).json({message: "Token inválido!"});
        }

        next();
    }
}

export default basicAuth;