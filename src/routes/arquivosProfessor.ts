import { Router } from 'express';

import storage from '../config/storage';
import ArquivosProfessorController from '../controllers/arquivosProfessorController';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth, ArquivosProfessorController.list);
router.post('/', auth, storage.single('file'), ArquivosProfessorController.create);

export default router;