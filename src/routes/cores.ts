import { Router } from 'express';

import basicAuth from '../middlewares/basicAuth';
import validateDto from '../middlewares/validate-dto';

import cor from '../models/cores';
import CoresController from '../controllers/coresController';

const router = Router();

router.get('/', basicAuth, CoresController.list);
router.post('/', basicAuth, validateDto(cor.create), CoresController.create);

export default router;