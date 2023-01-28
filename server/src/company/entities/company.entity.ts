import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
// import { Account } from '../account/entities/account.entity';
// import { Entry } from '../entry/entities/entry.entity';
// import { Transaction } from '../transaction/entities/transaction.entity';
import { CompanyUser } from './company-user.entity';

@Entity()
export class Company extends BaseEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => CompanyUser, (companyUser) => companyUser.company)
  companyUsers: CompanyUser[];

  // @OneToMany(() => Account, (account) => account.company)
  // accounts: Account[];

  // @OneToMany(() => Transaction, (transaction) => transaction.company)
  // transactions: Transaction[];

  // @OneToMany(() => Entry, (entry) => entry.company)
  // entries: Entry[];
}
