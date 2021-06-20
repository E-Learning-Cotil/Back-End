import {Request, Response, NextFunction} from 'express';

function validateDto(schema){
    return async(req: Request, res: Response, next: NextFunction) => {
        try{
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        }catch(err){
            res.status(400).json(err);
        }
    }
}

export default validateDto;