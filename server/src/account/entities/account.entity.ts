import { Column, Entity, OneToMany, VirtualColumn } from 'typeorm';
import { BaseEntity } from '@/src/common/entities/base.entity';
import { Entry } from '@/src/entry/entities/entry.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => Entry, (entry) => entry.account)
  entries: Entry[];

  @VirtualColumn({
    query: (alias) =>
      `SELECT SUM(entry.amount) FROM entry WHERE entry.account_id = ${alias}.id`,
  })
  balance: number;
}
