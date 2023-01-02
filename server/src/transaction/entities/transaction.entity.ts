import { AuditBase } from '@/src/common/audit-base.entity';
import { LedgerEntry } from '@/src/ledger/entities/ledger-entry.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Transaction extends AuditBase {
  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => LedgerEntry, (ledgerEntry) => ledgerEntry.transaction)
  ledgerEntries: LedgerEntry[];
}
