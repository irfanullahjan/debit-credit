import { Column, Entity, OneToMany } from 'typeorm';
import { AuditBase } from '@/src/common/audit-base.entity';
import { Entry } from '@/src/entry/entities/entry.entity';

@Entity()
export class Account extends AuditBase {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => Entry, (entry) => entry.account)
  entries: Entry[];
}
