import { Router } from 'express';

import auth from '../middlewares/auth';

import HomePageController from '../controllers/homePageController';

const router = Router();

router.get('/', auth, HomePageController.get);

export default router;