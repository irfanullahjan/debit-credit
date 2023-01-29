import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { getUserFromRequest } from '../jwt-utils';
import { Meta } from './meta.entity';

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
    const userId = getUserFromRequest()?.sub;
    this.meta.createdByUserId = userId;
    this.meta.updatedByUserId = userId;
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    this.meta.updatedByUserId = getUserFromRequest()?.sub;
  }

  @BeforeSoftRemove()
  beforeSoftRemove() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    this.meta.deletedByUserId = getUserFromRequest()?.sub;
  }
}
