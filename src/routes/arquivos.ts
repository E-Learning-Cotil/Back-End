import { Router } from 'express';

import storage from '../config/storage';
import ArquivosController from '../controllers/arquivosController';
import basicAuth from '../middlewares/basicAuth';

const router = Router();

router.post('/', basicAuth, storage.single('file'), ArquivosController.upload);

export default router;