import { Router } from 'express';

import basicAuth from '../middlewares/basicAuth';
import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import professor from '../models/professores';
import ProfessoresController from '../controllers/professoresController';

const router = Router();

router.get('/:id', ProfessoresController.listOne);
router.get('/', ProfessoresController.list);
router.post('/', basicAuth, validateDto(professor.create), ProfessoresController.create);
router.put('/', auth, validateDto(professor.update), ProfessoresController.update); 

export default router;