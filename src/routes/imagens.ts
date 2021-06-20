import { Router } from 'express';

import storage from '../config/storage';
import ImagesController from '../controllers/imagesController';

const router = Router();

router.post('/', storage.single('file'), ImagesController.upload);

export default router;