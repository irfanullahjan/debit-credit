import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getUserFromRequest } from 'src/common/jwt-utils';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.repository.save(
      new Company({
        ...createCompanyDto,
        memberships: [
          {
            userId: getUserFromRequest().sub,
            role: 'owner',
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

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
