import { Request, Response, NextFunction } from 'express';
import Cloudinary from '../config/cloudinary';
import { InternalError } from '../errors/InternalError';

class ArquivosController{
    async upload(req: Request, res: Response, next: NextFunction){
        try {
            let options = {};
            if(req.file.mimetype === 'application/pdf') options = {format: 'png'};

            Cloudinary.uploader.upload(req.file.path, options,  (error, result) => {
                return res.status(200).json(result.url);
            });
		} catch (error) {
			const err = new InternalError('Falha ao subir um arquivo!', 400, error.message);
            next(err);
		} 
    }
}

export default new ArquivosController();
