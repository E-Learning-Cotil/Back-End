import express from 'express';

import storage from './config/storage';

import renderDocs from './docs';

import authController from './controllers/authController';

import SeriesController from './controllers/seriesController';
import AlunosController from './controllers/alunosController';
import ProfessoresController from './controllers/professoresController';
import TurmasController from './controllers/turmasController';

import TopicosController from './controllers/topicosController';
import MateriaisController from './controllers/materiaisController';
import AtividadesController from './controllers/atividadesController';
import TestesController from './controllers/testesController';

import ConversasController from './controllers/conversasController';

import AtividadesAlunoController from './controllers/atividadesAlunoController';
import TestesAlunoController from './controllers/testesAlunoController';

import BoletimController from './controllers/boletimController';

import HomePageController from './controllers/homePageController';

import ImagesController from './controllers/imagesController';

import basicAuth from './middlewares/basicAuth';
import auth from './middlewares/auth';

const router = express.Router();

//Docs
router.get('/', renderDocs);

//Authentication
router.post('/authenticate', authController.authenticate);

//Series
router.get('/series/list', SeriesController.list);
router.post('/series/create', basicAuth, SeriesController.create);

//Alunos
router.get('/alunos/list-one/:id', AlunosController.listOne);
router.get('/alunos/list', AlunosController.list);
router.post('/alunos/create', basicAuth, AlunosController.create);
router.put('/alunos/update', auth, AlunosController.update);

//Professores
router.get('/professores/list-one/:id', ProfessoresController.listOne);
router.get('/professores/list', ProfessoresController.list);
router.post('/professores/create', basicAuth, ProfessoresController.create);
router.put('/professores/update', auth, ProfessoresController.update); 

//Turmas
router.get('/turmas/list-one/:id', TurmasController.listOne);
router.get('/turmas/list', TurmasController.list);
router.post('/turmas/create', basicAuth, TurmasController.create);
router.get('/turmas/list-by-role', auth, TurmasController.listByRole);

//Tópicos
router.get('/topicos/list-one/:id', auth, TopicosController.listOne);
router.get('/topicos/list/', auth, TopicosController.list);
router.post('/topicos/create', auth, TopicosController.create);

//Materiais
router.get('/materiais/list-one/:id', auth, MateriaisController.listOne);
router.get('/materiais/list/', auth, MateriaisController.list);
router.post('/materiais/create/', auth, MateriaisController.create);
router.put('/materiais/update/:id', auth, MateriaisController.update);

//Atividades
router.get('/atividades/list-one/:id', auth,  AtividadesController.listOne);
router.get('/atividades/list/', auth, AtividadesController.list);
router.post('/atividades/create/', auth, AtividadesController.create); 
router.put('/atividades/update/:id', auth, AtividadesController.update);

//Testes
router.get('/testes/list-one/:id', auth, TestesController.listOne);
router.get('/testes/list/', auth, TestesController.list);
router.post('/testes/create/', auth, TestesController.create); 
router.put('/testes/update/:id', auth, TestesController.update);

//Atividades Aluno
router.get('/atividades-aluno/list-one/:id', auth, AtividadesAlunoController.listOne);
router.get('/atividades-aluno/list/', auth, AtividadesAlunoController.list);
router.post('/atividades-aluno/create/', auth, AtividadesAlunoController.create);
router.put('/atividades-aluno/update/:id', auth, AtividadesAlunoController.update);

//Testes Aluno
router.get('/testes-aluno/list-one/:id', auth, TestesAlunoController.listOne);
router.get('/testes-aluno/list/', auth, TestesAlunoController.list);
router.post('/testes-aluno/create/', auth, TestesAlunoController.create); 
router.put('/testes-aluno/update/:id', auth, TestesAlunoController.update); 

//Conversas
router.get('/conversas', ConversasController.list);
router.post('/conversas', ConversasController.create);
router.get('/conversas/mensagens/:id', ConversasController.listMessages);

//Boletim
router.get('/boletim', auth, BoletimController.get); 
router.get('/boletim/render-pdf', auth, BoletimController.renderFile);
router.get('/boletim/create-pdf', auth, BoletimController.createFile);

//Home Page
router.get('/homepage/:id', auth, HomePageController.get);

//Imagens
router.post('/image/upload', storage.single('file'), ImagesController.upload);

export default router;