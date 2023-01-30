import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  VirtualColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Company } from '../../../company/entities/company.entity';
import { Entry } from '../../../company/entry/entities/entry.entity';

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

  @ManyToOne(() => Company, (company) => company.accounts)
  company: Company;

  @Column()
  companyId: number;

  constructor(partial: Partial<Account>, companyId: number) {
    super();
    Object.assign(this, partial);
    this.companyId = companyId;
  }
}
