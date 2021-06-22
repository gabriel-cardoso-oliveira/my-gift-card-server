import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();

  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const {
      transaction_type,
      transaction_value,
      transaction_date,
      store_identification,
    } = request.body;

    const parseDate = parseISO(transaction_date);

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
      transaction_type,
      transaction_value,
      transaction_date: parseDate,
      store_identification,
    });

    return response.json(transaction);
  } catch (error) {
    return response.status(400).json({
      error: 'Error creating a transaction. try again!'
    });
  }
});

export default transactionsRouter;