import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { Membership, MembershipRole } from './entities/membership.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly repository: Repository<Membership>,
  ) {}
  async create(companyId: number, createDto: CreateMembershipDto) {
    const user = await this.repository.manager.getRepository(User).findOne({
      where: { email: createDto.email },
    });
    return this.repository.save(
      new Membership({ userId: user.id, role: createDto.role }, companyId),
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

  async update(companyId: number, id: number, updateDto: UpdateMembershipDto) {
    const allMemberships = await this.repository.find({ where: { companyId } });
    const currentMembership = allMemberships.find((m) => m.id === id);

    const OWNER = MembershipRole.owner;

    if (currentMembership.role === OWNER && updateDto.role !== OWNER) {
      const totalOwners = allMemberships.filter((m) => m.role === OWNER);

      if (totalOwners.length === 1) {
        throw new BadRequestException(
          'Cannot remove the last owner of the company',
        );
      }
    }

    return this.repository.update(
      { id, companyId },
      new Membership({ role: updateDto.role }, companyId),
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
