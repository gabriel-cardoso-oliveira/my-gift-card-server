import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import GiftCard from './GiftCard';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  giftcard_id: string;

  @ManyToOne(() => GiftCard)
  @JoinColumn({ name: 'giftcard_id' })
  gift_card: GiftCard;
}

export default Transaction;
