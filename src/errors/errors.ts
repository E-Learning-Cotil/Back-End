import { Response, Request, NextFunction } from 'express';
import { InternalError } from '../errors/InternalError';

class Errors{
    notFound(req: Request, res: Response, next: NextFunction){
        const err = new InternalError("Rota não encontrada", 404);
        next(err);
    }

    handleAll(error: any, req: Request, res: Response, next: NextFunction){
        const err = new InternalError(error.message, error.status, error.description);
        
        res
        .status(err.status)
        .json({
            error: err.message,
            description: err.description
        });
    }
}

export default new Errors();