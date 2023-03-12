import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getUserFromRequest } from 'src/common/jwt-utils';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { MembershipRole } from './membership/entities/membership.entity';
import { MembershipService } from './membership/membership.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
    @Inject(MembershipService)
    private readonly membershipService: MembershipService,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.repository.save(
      new Company({
        ...createCompanyDto,
        memberships: [
          {
            userId: getUserFromRequest().sub,
            role: MembershipRole.owner,
          },
        ],
      }),
    );
  }

  findAll(userId: number) {
    return this.repository.find({
      where: {
        memberships: {
          userId,
        },
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  async remove(companyId: number, userId: number) {
    const membership = await this.membershipService.findOneByCompanyIdAndUserId(
      companyId,
      userId,
    );
    if (membership.role === MembershipRole.owner) {
      return this.repository.softDelete(companyId);
    }
    throw new UnauthorizedException();
  }
}
