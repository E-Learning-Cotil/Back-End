import { Router } from 'express';

import basicAuth from '../middlewares/basicAuth';
import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import icone from '../models/icones';
import IconesController from '../controllers/iconesController';

const router = Router();

router.get('/', basicAuth, IconesController.list);
router.post('/', basicAuth, validateDto(icone.create), IconesController.create);

export default router;