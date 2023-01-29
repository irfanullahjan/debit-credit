import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Company } from '../../../company/entities/company.entity';
import { Entry } from '../../../company/entry/entities/entry.entity';

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

  @ManyToOne(() => Company, (company) => company.accounts)
  company: Company;

  @Column()
  companyId: number;
}
