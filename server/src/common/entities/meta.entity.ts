import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export class Meta {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, undefined, { nullable: true })
  createdByUser: User;

  @Column({ type: 'int', nullable: true })
  createdByUserId: number;

  @ManyToOne(() => User, undefined, { nullable: true })
  updatedByUser: User;

  @Column({ type: 'int', nullable: true })
  updatedByUserId: number;

  @ManyToOne(() => User, undefined, { nullable: true })
  deletedByUser?: User;

  @Column({ type: 'int', nullable: true })
  deletedByUserId?: number;
}
