import express from 'express';

import renderDocs from './docs';
import SeriesController from './controllers/seriesController';
import AlunosController from './controllers/alunosController';
import ProfessoresController from './controllers/professoresController';

const router = express.Router();

//Docs
router.get('/', renderDocs);

//Series
router.get('/series/list', SeriesController.list);
router.post('/series/create', SeriesController.create);

//Alunos
router.get('/alunos/list', AlunosController.list);
router.get('/alunos/list-one/:id', AlunosController.listOne);
router.post('/alunos/create', AlunosController.create);
router.put('/alunos/update/:id', AlunosController.update);

//Professores
router.get('/professores/list', ProfessoresController.list);
router.get('/professores/list-one/:id', ProfessoresController.listOne);
router.post('/professores/create', ProfessoresController.create);
router.put('/professores/update/:id', ProfessoresController.update);

export default router;