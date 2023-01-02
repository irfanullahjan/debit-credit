import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ type: 'int', nullable: false })
  updatedByUserId: number;

  @Column({ type: 'int', nullable: false })
  createdByUserId: number;

  @Column({ type: 'int', nullable: true })
  deletedByUserId?: number;

  @BeforeInsert()
  setCreatedByUserId() {
    this.createdByUserId = 1;
    this.updatedByUserId = 1;
  }

  @BeforeUpdate()
  setUpdatedByUserId() {
    this.updatedByUserId = 1;
  }

  @BeforeSoftRemove()
  setDeletedByUserId() {
    this.deletedByUserId = 1;
  }
}
