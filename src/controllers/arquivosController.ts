import { Request, Response, NextFunction } from 'express';
import Cloudinary from '../config/cloudinary';
import { InternalError } from '../errors/InternalError';

class ArquivosController{
    async upload(req: Request, res: Response, next: NextFunction){
        try {
            let options = {};
            if(req.file.mimetype === 'application/pdf') options = {format: 'png'};
            
            Cloudinary.uploader.upload(req.file.path, options,  (error, result) => {
                console.log(result)
                return res.status(200).json({link: result.url, name: req.file.filename});
            });
		} catch (error) {
			const err = new InternalError('Falha ao subir um arquivo!', 400, error.message);
            next(err);
		} 
    }
}

export default new ArquivosController();
