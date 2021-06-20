import { Router } from 'express';

import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import material from '../models/materiais';
import MateriaisController from '../controllers/materiaisController';

const router = Router();

router.get('/:id', auth, MateriaisController.listOne);
router.get('/', auth, MateriaisController.list);
router.post('/', auth, validateDto(material.create), MateriaisController.create);
router.put('/:id', auth, validateDto(material.update), MateriaisController.update);

export default router;