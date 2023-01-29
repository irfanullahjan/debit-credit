import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Account } from '../account/entities/account.entity';
import { Entry } from '../entry/entities/entry.entity';
import { Membership } from '../membership/entities/membership.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

@Entity()
export class Company extends BaseEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Membership, (membership) => membership.company, {
    cascade: ['insert'],
  })
  memberships: Membership[];

  @OneToMany(() => Account, (account) => account.company)
  accounts: Account[];

  @OneToMany(() => Transaction, (transaction) => transaction.company)
  transactions: Transaction[];

  @OneToMany(() => Entry, (entry) => entry.company)
  entries: Entry[];

  constructor(partial: DeepPartial<Company>) {
    super();
    Object.assign(this, partial);
  }
}
