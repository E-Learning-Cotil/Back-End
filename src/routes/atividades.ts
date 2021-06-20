import { Router } from 'express';

import basicAuth from '../middlewares/basicAuth';
import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import atividade from '../models/atividades';
import AtividadesController from '../controllers/atividadesController';

const router = Router();

router.get('/:id', auth,  AtividadesController.listOne);
router.get('/', auth, AtividadesController.list);
router.post('/', auth, validateDto(atividade.create), AtividadesController.create); 
router.put('/:id', auth, validateDto(atividade.update), AtividadesController.update);

export default router;