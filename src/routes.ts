import express from 'express';
import swaggerUi from 'swagger-ui-express';

import authController from './controllers/authController';

//DESKTOP
import seriesRouter from './routes/series';
import alunosRouter from './routes/alunos';
import professoresRouter from './routes/professores';
import turmasRouter from './routes/turmas';

//WEB & MOBILE
import topicosRouter from './routes/topicos';
import materiaisRouter from './routes/materiais';
import atividadesRouter from './routes/atividades';
import testesRouter from './routes/testes';
import atividadesAlunoRouter from './routes/atividadesAluno';
import testesAlunoRouter from './routes/testesAluno';
import boletimRouter from './routes/boletim';
import homePageRouter from './routes/homepage';
import imagensRouter from './routes/imagens';

//DOCS
import apiSchema from '../public/api-schema.json';

const router = express.Router();

//Docs

//Authentication
router.post('/authenticate', authController.authenticate);

//Series
router.use('/series', seriesRouter);

//Alunos
router.use('/alunos', alunosRouter);

//Professores
router.use('/professores', professoresRouter);

//Turmas 
router.use('/turmas', turmasRouter);

//Tópicos 
router.use('/topicos', topicosRouter);

//Materiais 
router.use('/materiais', materiaisRouter);

//Atividade
router.use('/atividades', atividadesRouter);

//Testes
router.use('/testes', testesRouter)

//Atividades Aluno
router.use('/atividades-aluno', atividadesAlunoRouter);

//Testes Aluno
router.use('/testes-aluno', testesAlunoRouter);

//Boletim
router.use('/boletim', boletimRouter);

//Pagina Inicial
router.use('/pagina-inicial', homePageRouter);

//Imagens
router.use('/imagens', imagensRouter)

router.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));

export default router;