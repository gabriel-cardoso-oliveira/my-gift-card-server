import { Router } from 'express';
import transactionsRouter from './transactions.routes';
import giftcardsRouter from './giftcards.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/giftcards', giftcardsRouter);

export default routes;
