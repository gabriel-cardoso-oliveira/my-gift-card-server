import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('gift_card')
class GiftCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  gifcard_number: Number;

  @Column()
  giftcard_password: string;

  @Column('date')
  giftcard_validated: Date;

  @Column()
  giftcard_message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GiftCard;
