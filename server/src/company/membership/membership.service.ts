import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { Membership } from './entities/membership.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly repository: Repository<Membership>,
  ) {}
  async create(companyId: number, createUserDto: CreateMembershipDto) {
    const user = await this.repository.manager.getRepository(User).findOne({
      where: { email: createUserDto.email },
    });
    return this.repository.save(
      new Membership(
        {
          userId: user.id,
          role: createUserDto.role,
        },
        companyId,
      ),
    );
  }

  findAll(companyId: number) {
    return this.repository.find({
      where: { companyId },
      relations: ['user'],
    });
  }

  findAllByUserId(userId: number) {
    return this.repository.find({ where: { userId } });
  }

  findAllByCompanyId(companyId: number) {
    return this.repository.find({ where: { companyId } });
  }

  findOne(companyId: number, id: number) {
    return this.repository.findOne({
      where: { id, companyId },
      relations: ['user'],
    });
  }

  async update(
    companyId: number,
    id: number,
    updateMembershipDto: UpdateMembershipDto,
  ) {
    const allMemberships = await this.repository.find({ where: { companyId } });
    const currentMembership = allMemberships.find(
      (membership) => membership.id === id,
    );

    if (currentMembership && currentMembership.role === 'owner') {
      const otherOwners = allMemberships.filter(
        (membership) => membership.role === 'owner' && membership.id !== id,
      );

      if (otherOwners.length === 0) {
        throw new Error('Cannot remove the last owner of the company');
      }
    }

    return this.repository.update(
      { id, companyId },
      new Membership(
        {
          role: updateMembershipDto.role,
        },
        companyId,
      ),
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
