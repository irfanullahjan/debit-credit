import { AfterLoad, Column, Entity, ManyToOne, VirtualColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Account } from '../../../company/account/entities/account.entity';
import { Company } from '../../../company/entities/company.entity';
import { Transaction } from '../../../company/transaction/entities/transaction.entity';

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

  @ManyToOne(() => Company, (company) => company.accounts)
  company: Company;

  @Column()
  companyId: number;

  constructor(partial: Partial<Entry>, companyId: number) {
    super();
    Object.assign(this, partial);
    this.companyId = companyId;
  }
}
