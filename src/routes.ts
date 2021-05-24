import express from 'express';

import renderDocs from './docs';

import SeriesController from './controllers/seriesController';
import AlunosController from './controllers/alunosController';
import ProfessoresController from './controllers/professoresController';
import TurmasController from './controllers/turmasController';

import TopicosController from './controllers/topicosController';
import MateriaisController from './controllers/materiaisController';
import AtividadesController from './controllers/atividadesController';
import TestesController from './controllers/testesController';

import AtividadesAlunoController from './controllers/atividadesAlunoController';

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
router.get('/turmas/list-by-aluno/:id', TurmasController.listByAluno);
router.get('/turmas/list-by-professor/:id', TurmasController.listByProfessor);

//Tópicos
router.get('/topicos/list-one/:id', TopicosController.listOne);
router.get('/topicos/list/', TopicosController.list);
router.post('/topicos/create/', TopicosController.create);

//Materiais
router.get('/materiais/list-one/:id', MateriaisController.listOne);
router.get('/materiais/list/', MateriaisController.list);
router.post('/materiais/create/', MateriaisController.create);
router.put('/materiais/update/:id', MateriaisController.update);

//Atividades
router.get('/atividades/list-one/:id', AtividadesController.listOne);
router.get('/atividades/list/', AtividadesController.list);
router.post('/atividades/create/', AtividadesController.create);
router.put('/atividades/update/:id', AtividadesController.update);

//Testes
router.get('/testes/list-one/:id', TestesController.listOne);
router.get('/testes/list/', TestesController.list);
router.post('/testes/create/', TestesController.create);
router.put('/testes/update/:id', TestesController.update);

//Atividades Aluno
router.get('/atividades-aluno/list-one/:id', AtividadesAlunoController.listOne);
router.get('/atividades-aluno/list/', AtividadesAlunoController.list);
router.post('/atividades-aluno/create/', AtividadesAlunoController.create);
router.put('/atividades-aluno/update/:id', AtividadesAlunoController.update);

export default router;