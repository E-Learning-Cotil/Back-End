import { Router } from 'express';

import basicAuth from '../middlewares/basicAuth';
import validateDto from '../middlewares/validate-dto';

import serie from '../models/series';
import SeriesController from '../controllers/seriesController';

const router = Router();

router.get('/', basicAuth, SeriesController.list);
router.post('/', basicAuth, validateDto(serie.create), SeriesController.create);

export default router;