import { Request, Response, NextFunction } from 'express';
import B2 from 'easy-backblaze';
import { InternalError } from '../errors/InternalError';

const b2 = new B2(process.env.B2_ACCOUNT_ID, process.env.B2_APP_KEY);

class ImagesController{
    async upload(req: Request, res: Response, next: NextFunction){
        try {
			await b2.uploadFile(req.file.path, {
                name: req.file.filename,
                bucket: 'e-learning-storage',
            }, function(err: any, file: any) {
                return res.status(200).json(file);
            });
		} catch (error) {
			const err = new InternalError('Falha ao listar um aluno!', 400, error.message);
            next(err);
		} 
    }
}

export default new ImagesController();