import { AfterLoad, Column, Entity, OneToMany, VirtualColumn } from 'typeorm';
import { BaseEntity } from '@/src/common/entities/base.entity';
import { Entry } from '@/src/ledger/entry/entities/entry.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => Entry, (entry) => entry.account)
  entries: Entry[];

  @VirtualColumn({
    query: (alias) =>
      `SELECT COALESCE(SUM(amount), 0) FROM entry WHERE account_id = ${alias}.id`,
  })
  balance: number;

  balanceCredit: number;

  balanceDebit: number;

  @AfterLoad()
  afterLoad() {
    if (this.balance >= 0) {
      this.balanceDebit = this.balance;
      this.balanceCredit = 0;
    } else {
      this.balanceDebit = 0;
      this.balanceCredit = -this.balance;
    }
  }
}
