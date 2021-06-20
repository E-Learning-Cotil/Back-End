import { Router } from 'express';

import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import testesAluno from '../models/testesAluno';
import TestesAlunoController from '../controllers/testesAlunoController';

const router = Router();

router.get('/:id', auth, TestesAlunoController.listOne);
router.get('/', auth, TestesAlunoController.list);
router.post('/', auth, validateDto(testesAluno.create), TestesAlunoController.create); 
router.put('/:id', auth, validateDto(testesAluno.update),TestesAlunoController.update);

export default router;