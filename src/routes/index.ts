import { Router } from 'express';
import transactionsRouter from './transactions.routes';
import giftcardsRouter from './giftcards.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/giftcards', giftcardsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
