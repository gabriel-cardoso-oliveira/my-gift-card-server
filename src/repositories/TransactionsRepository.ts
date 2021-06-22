import Transaction from '../models/Transaction';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async findByDate(date: Date): Promise<Transaction | null> {
    const findTransaction = await this.findOne({
      where: { date },
    });

    return findTransaction || null;
  }
}

export default TransactionsRepository;
