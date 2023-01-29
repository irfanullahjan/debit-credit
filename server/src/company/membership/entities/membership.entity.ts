import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../../user/entities/user.entity';
import { Company } from '../../entities/company.entity';

enum MemberRoles {
  OWNER = 'owner',
  MANAGER = 'manager',
  JUNIOR = 'junior',
}

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
    type: 'jsonb',
    nullable: false,
    default: () => `'["${MemberRoles.JUNIOR}"]'`,
  })
  roles: MemberRoles[];
}
