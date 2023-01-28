import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Company } from './company.entity';

@Entity()
export class CompanyUser extends BaseEntity {
  @ManyToOne(() => User, (user) => user.companyUsers)
  user: User;

  @ManyToOne(() => Company, (company) => company.companyUsers)
  company: Company;

  @Column()
  role: string;
}
