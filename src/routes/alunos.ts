import { Router } from 'express';

import basicAuth from '../middlewares/basicAuth';
import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import aluno from '../models/alunos';
import AlunosController from '../controllers/alunosController';

const router = Router();

router.get('/:id', AlunosController.listOne);
router.get('/', AlunosController.list);
router.post('/', basicAuth, validateDto(aluno.create), AlunosController.create);
router.put('/', auth, validateDto(aluno.update), AlunosController.update);

export default router;