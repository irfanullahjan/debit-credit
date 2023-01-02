import { Column, Entity } from 'typeorm';
import { AuditBase } from '@/src/common/audit-base.entity';

@Entity()
export class Account extends AuditBase {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
}
