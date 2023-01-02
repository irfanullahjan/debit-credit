import { AuditBase } from '@/src/common/audit-base.entity';
import { LedgerEntry } from '@/src/ledger/entities/ledger-entry.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Transaction extends AuditBase {
  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => LedgerEntry, (ledgerEntry) => ledgerEntry.transaction, {
    cascade: true,
  })
  ledgerEntries: LedgerEntry[];
}
