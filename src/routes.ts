import express from 'express';

import renderDocs from './docs';

import SeriesController from './controllers/seriesController';
import AlunosController from './controllers/alunosController';
import ProfessoresController from './controllers/professoresController';
import TurmasController from './controllers/turmasController';

const router = express.Router();

//Docs
router.get('/', renderDocs);

//Series
router.get('/series/list', SeriesController.list);
router.post('/series/create', SeriesController.create);

//Alunos
router.get('/alunos/list-one/:id', AlunosController.listOne);
router.get('/alunos/list', AlunosController.list);
router.post('/alunos/create', AlunosController.create);
router.put('/alunos/update/:id', AlunosController.update);

//Professores
router.get('/professores/list-one/:id', ProfessoresController.listOne);
router.get('/professores/list', ProfessoresController.list);
router.post('/professores/create', ProfessoresController.create);
router.put('/professores/update/:id', ProfessoresController.update);

//Turmas
router.get('/turmas/list-one/:id', TurmasController.listOne);
router.get('/turmas/list', TurmasController.list);
router.post('/turmas/create', TurmasController.create);

export default router;