import { Router } from 'express';

import basicAuth from '../middlewares/basicAuth';
import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import turma from '../models/turmas';
import TurmasController from '../controllers/TurmasController';

const router = Router();

router.get('/list-by-role', auth, TurmasController.listByRole);
router.get('/:id', TurmasController.listOne);
router.get('/', TurmasController.list);
router.post('/', basicAuth, validateDto(turma.create), TurmasController.create);

export default router;