import { Router } from 'express';

import auth from '../middlewares/auth';

import UsuarioController from '../controllers/usuarioController';

const router = Router();

router.get('/@me', auth, UsuarioController.list);

export default router;