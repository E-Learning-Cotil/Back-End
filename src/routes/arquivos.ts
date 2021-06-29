import { Router } from 'express';

import storage from '../config/storage';
import ArquivosController from '../controllers/arquivosController';

const router = Router();

router.post('/', storage.single('file'), ArquivosController.upload);

export default router;