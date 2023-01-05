import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Meta {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ type: 'int', update: false, nullable: false })
  createdByUserId: number;

  @Column({ type: 'int', nullable: false })
  updatedByUserId: number;

  @Column({ type: 'int', nullable: true })
  deletedByUserId?: number;
}
