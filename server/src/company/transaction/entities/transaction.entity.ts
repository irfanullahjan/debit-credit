import { BaseEntity } from '@/src/common/entities/base.entity';
import { Entry } from '@/src/company/entry/entities/entry.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  documentRef?: string;

  @OneToMany(() => Entry, (entry) => entry.transaction, {
    cascade: true,
  })
  entries: Entry[];
}
