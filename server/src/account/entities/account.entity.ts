import { Column, Entity, OneToMany } from 'typeorm';
import { AuditBase } from '@/src/common/audit-base.entity';
import { LedgerEntry } from '@/src/ledger/entities/ledger-entry.entity';

@Entity()
export class Account extends AuditBase {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => LedgerEntry, (ledgerEntry) => ledgerEntry.account)
  ledgerEntries: LedgerEntry[];

  constructor(partial: Partial<Account>) {
    super();
    Object.assign(this, partial);
  }
}
