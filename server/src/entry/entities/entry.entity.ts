import { Account } from '@/src/account/entities/account.entity';
import { AuditBase } from '@/src/common/audit-base.entity';
import { Transaction } from '@/src/transaction/entities/transaction.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Entry extends AuditBase {
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
