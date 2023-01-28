import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { CompanyUser } from '../../company/entities/company-user.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'text', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => CompanyUser, (companyUser) => companyUser.user)
  companyUsers: CompanyUser[];
}
