import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transaction_type: string;

  @Column('numeric')
  transaction_value: Number;

  @Column('time with time zone')
  transaction_date: Date;

  @Column()
  store_identification: string;
}

export default Transaction;
