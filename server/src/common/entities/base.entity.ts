import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meta } from './meta.entity';
import { RequestContext } from 'nestjs-request-context';

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
    const req = RequestContext.currentContext.req;
    const userId = req.user?.userId || 0;
    this.meta.createdByUserId = userId;
    this.meta.updatedByUserId = userId;
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    const req = RequestContext.currentContext.req;
    const userId = req.user?.userId || 0;
    this.meta.updatedByUserId = userId;
  }

  @BeforeSoftRemove()
  beforeSoftRemove() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    const req = RequestContext.currentContext.req;
    const userId = req.user?.userId || 0;
    this.meta.deletedByUserId = userId;
  }
}
