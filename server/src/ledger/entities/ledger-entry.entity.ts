import { AuditBase as AuditBase } from '@/src/common/audit-base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class LedgerEntry extends AuditBase {
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'int', nullable: false })
  accountId: number;
}
