import { Router } from 'express';
import TeamController from '../controller/team.controller';

const teamRouter = Router();
const controller = new TeamController();

teamRouter.get('/:id', controller.getTeam.bind(controller));
teamRouter.get('/', controller.getAllTeams.bind(controller));

export default teamRouter;
