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
    this.meta.createdByUserId = req.user?.userId;
    this.meta.updatedByUserId = req.user?.userId;
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    const req = RequestContext.currentContext.req;
    this.meta.updatedByUserId = req.user?.userId;
  }

  @BeforeSoftRemove()
  beforeSoftRemove() {
    if (!this.meta) {
      this.meta = new Meta();
    }
    const req = RequestContext.currentContext.req;
    this.meta.deletedByUserId = req.user?.userId;
  }
}
