import * as express from 'express';
import UserController from './controller/user.controller';
import { validateUser } from './middleware/validation';
import leaderRouter from './routes/LeaderBoardRoute';
import matchRouter from './routes/MatchRoutes';
import teamRouter from './routes/teamRoutes';

class App {
  public app: express.Express;
  public controller;

  constructor() {
    this.app = express();
    this.controller = new UserController();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.post('/login', validateUser, this.controller.getLogin);
    this.app.get('/login/validate', this.controller.getAccess);
    this.app.use('/teams', teamRouter);
    this.app.use('/matches', matchRouter);
    this.app.use('/leaderboard', leaderRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
