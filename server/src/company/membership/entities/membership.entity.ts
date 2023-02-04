import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../../user/entities/user.entity';
import { Company } from '../../entities/company.entity';

export type MembershipRole = 'owner' | 'manager' | 'user';

@Entity()
export class Membership extends BaseEntity {
  @ManyToOne(() => User, (user) => user.memberships)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Company, (company) => company.memberships)
  company: Company;

  @Column()
  companyId: number;

  @Column({
    type: 'enum',
    enum: ['owner', 'manager', 'user'],
  })
  role: MembershipRole;

  constructor(partial: Partial<Membership>, companyId: number) {
    super();
    Object.assign(this, partial);
    this.companyId = companyId;
  }
}
