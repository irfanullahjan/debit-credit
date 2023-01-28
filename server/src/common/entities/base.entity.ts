import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meta } from './meta.entity';
import { getJwtUserId } from '../getJwtUser';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Meta)
  meta: Meta;

  @BeforeInsert()
  beforeInsert() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    const userId = getJwtUserId();
    this.meta.createdByUserId = userId;
    this.meta.updatedByUserId = userId;
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    this.meta.updatedByUserId = getJwtUserId();
  }

  @BeforeSoftRemove()
  beforeSoftRemove() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    this.meta.deletedByUserId = getJwtUserId();
  }
}
