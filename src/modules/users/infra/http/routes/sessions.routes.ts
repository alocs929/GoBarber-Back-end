import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsControlle = new SessionsController();

sessionsRouter.post('/', sessionsControlle.create);

export default sessionsRouter;
