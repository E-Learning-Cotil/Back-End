import { Router } from 'express';

import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import teste from '../models/testes';
import TestesController from '../controllers/testesController';

const router = Router();

router.get('/:id', auth, TestesController.listOne);
router.get('/', auth, TestesController.list);
router.post('/', auth, validateDto(teste.create), TestesController.create); 
router.put('/:id', auth, validateDto(teste.update), TestesController.update);

export default router;