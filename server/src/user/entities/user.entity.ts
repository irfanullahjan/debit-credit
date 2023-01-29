import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Membership } from '../../company/membership/entities/membership.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'text', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];
}
