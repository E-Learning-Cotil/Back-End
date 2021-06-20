import { Router } from 'express';

import auth from '../middlewares/auth';
import validateDto from '../middlewares/validate-dto';

import topico from '../models/topicos';
import TopicosController from '../controllers/topicosController';

const router = Router();

router.get('/:id', auth, TopicosController.listOne);
router.get('/', auth, TopicosController.list);
router.post('/', auth, validateDto(topico.create), TopicosController.create);

export default router;