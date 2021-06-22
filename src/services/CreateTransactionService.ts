import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  transaction_type: string;
  transaction_value: Number;
  transaction_date: Date;
  store_identification: string;
  giftcard_id: string;
}

class CreateTransactionService {
  public async execute({
    transaction_type,
    transaction_value,
    transaction_date,
    store_identification,
    giftcard_id,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionDate = startOfHour(transaction_date);

    const transaction = transactionsRepository.create({
      transaction_type,
      transaction_date: transactionDate,
      transaction_value,
      store_identification,
      giftcard_id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
