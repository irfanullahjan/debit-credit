import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/src/common/base.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
}
