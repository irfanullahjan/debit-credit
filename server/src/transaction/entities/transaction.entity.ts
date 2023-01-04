import { BaseEntity } from '@/src/common/entities/base.entity';
import { Entry } from '@/src/entry/entities/entry.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  documentRef: string;

  @OneToMany(() => Entry, (entry) => entry.transaction, {
    cascade: true,
  })
  entries: Entry[];
}
