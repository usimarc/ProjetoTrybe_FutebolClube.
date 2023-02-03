import { Router } from 'express';
import LeaderController from '../controller/leader.controller';

const leaderRouter = Router();
const controller = new LeaderController();

leaderRouter.get('/home', controller.leaderAtHome.bind(controller));
leaderRouter.get('/away', controller.leaderAway.bind(controller));
leaderRouter.get('/', controller.leaderBoard.bind(controller));

export default leaderRouter;
