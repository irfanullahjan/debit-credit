import { Account } from '@/src/account/entities/account.entity';
import { BaseEntity } from '@/src/common/entities/base.entity';
import { Transaction } from '@/src/transaction/entities/transaction.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Entry extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Account, (account) => account.entries, {
    nullable: false,
  })
  account: Account;

  @Column({ type: 'int' })
  accountId: number;

  @ManyToOne(() => Transaction, (transaction) => transaction.entries, {
    nullable: false,
  })
  transaction: Transaction;

  @Column({ type: 'int' })
  transactionId: number;
}
