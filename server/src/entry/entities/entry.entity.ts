import { Account } from '@/src/account/entities/account.entity';
import { BaseEntity } from '@/src/common/entities/base.entity';
import { Transaction } from '@/src/transaction/entities/transaction.entity';
import { AfterLoad, Column, Entity, ManyToOne, VirtualColumn } from 'typeorm';

@Entity()
export class Entry extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  amountDebit: number;

  amountCredit: number;

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

  // get date from transaction
  @VirtualColumn({
    query: (alias) =>
      `SELECT transaction.date FROM transaction WHERE transaction.id = ${alias}.transaction_id`,
    type: 'date',
  })
  date: Date;

  @AfterLoad()
  afterLoad() {
    if (this.amount >= 0) {
      this.amountDebit = this.amount;
      this.amountCredit = 0;
    } else {
      this.amountDebit = 0;
      this.amountCredit = -this.amount;
    }
  }
}
