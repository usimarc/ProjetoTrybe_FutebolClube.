import { Router } from 'express';
import MatchController from '../controller/match.controller';
import { validateToken } from '../middleware/validation';

const matchRouter = Router();
const controller = new MatchController();

matchRouter.patch('/:id/finish', validateToken, controller.finishMatch.bind(controller));
matchRouter.patch('/:id', validateToken, controller.updateScore.bind(controller));
matchRouter.get('/', controller.getMatches.bind(controller));
matchRouter.post('/', validateToken, controller.createMatch.bind(controller));

export default matchRouter;
