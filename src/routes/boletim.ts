import { Router } from 'express';

import auth from '../middlewares/auth';

import BoletimController from '../controllers/boletimController';

const router = Router();

router.get('/', auth, BoletimController.get); 
router.get('/create-pdf', auth, BoletimController.createFile);

export default router;