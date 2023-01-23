import { User } from '@/src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

export class Meta {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User)
  createdByUser: User;

  @Column({ type: 'int', nullable: true })
  createdByUserId: number;

  @ManyToOne(() => User)
  updatedByUser: User;

  @Column({ type: 'int', nullable: true })
  updatedByUserId: number;

  @ManyToOne(() => User)
  deletedByUser?: User;

  @Column({ type: 'int', nullable: true })
  deletedByUserId?: number;
}
