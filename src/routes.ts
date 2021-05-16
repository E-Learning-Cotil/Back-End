import express from 'express';

import SeriesController from './controllers/seriesController';
import AlunosController from './controllers/alunosController';

const router = express.Router();

//Series
router.get('/series/list', SeriesController.list);
router.post('/series/create', SeriesController.create);

//Alunos
router.get('/alunos/list', AlunosController.list);
router.get('/alunos/list-one/:id', AlunosController.listOne);
router.post('/alunos/create', AlunosController.create);
router.put('/alunos/update/:id', AlunosController.update);

export default router;