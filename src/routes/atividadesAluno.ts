import { Router } from 'express';

import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import atividadeAluno from '../models/atividadesAluno';
import AtividadesAlunoController from '../controllers/atividadesAlunoController';

const router = Router();

router.get('/:id', auth, AtividadesAlunoController.listOne);
router.get('/', auth, AtividadesAlunoController.list);
router.post('/', auth, validateDto(atividadeAluno.create), AtividadesAlunoController.create);
router.put('/:id', auth, validateDto(atividadeAluno.update), AtividadesAlunoController.update);

export default router;