import express from 'express';

import SeriesController from './controllers/seriesController';

const router = express.Router();

//Series
router.get("/create", SeriesController.create);
router.get('/list', SeriesController.list);

export default router;