import { Router } from 'express';

import basicAuth from '../middlewares/basicAuth';
import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import turma from '../models/turmas';
import TurmasController from '../controllers/turmasController';

const router = Router();

router.get('/list-by-role', auth, TurmasController.listByRole);
router.get('/:id', basicAuth, TurmasController.listOne);
router.get('/', basicAuth, TurmasController.list);
router.post('/', basicAuth, validateDto(turma.create), TurmasController.create);

export default router;