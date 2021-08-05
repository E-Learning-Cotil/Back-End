import { Request, Response, NextFunction } from 'express';
import Cloudinary from '../config/cloudinary';
import { InternalError } from '../errors/InternalError';

class ArquivosController{
    async upload(req: Request, res: Response, next: NextFunction){
        try {
            Cloudinary.uploader.upload(req.file.path, function(error, result) {
                return res.status(200).json(result.url);
            });
		} catch (error) {
			const err = new InternalError('Falha ao subir um arquivo!', 400, error.message);
            next(err);
		} 
    }
}

export default new ArquivosController();