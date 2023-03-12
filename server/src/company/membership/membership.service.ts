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
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const existingMember = await this.repository.findOne({
      where: { userId: user.id, companyId },
    });
    if (existingMember) {
      throw new BadRequestException('User is already a member');
    }
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

  findOneByCompanyIdAndUserId(companyId: number, userId: number) {
    return this.repository.findOne({ where: { companyId, userId } });
  }

  async update(companyId: number, id: number, updateDto: UpdateMembershipDto) {
    if (updateDto.role !== MembershipRole.owner) {
      await this.ensureNotLastOwner(companyId, id);
    }
    return this.repository.update(
      { id, companyId },
      new Membership({ role: updateDto.role }, companyId),
    );
  }

  async remove(companyId: number, id: number) {
    await this.ensureNotLastOwner(companyId, id);
    return this.repository.delete({ id, companyId });
  }

  private async ensureNotLastOwner(companyId: number, id: number) {
    const allMemberships = await this.repository.find({ where: { companyId } });
    const currentMembership = allMemberships.find((m) => m.id === id);
    const OWNER = MembershipRole.owner;
    if (currentMembership.role === OWNER) {
      const ownersCount = allMemberships.filter((m) => m.role === OWNER).length;
      if (ownersCount === 1) {
        throw new BadRequestException(
          'Cannot remove the last owner of the company',
        );
      }
    }
  }
}
