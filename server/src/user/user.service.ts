import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    createUserDto.password = await hash(password, 10);
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  findMembershipsByUserId(id: number) {
    return this.userRepository
      .findOne({
        where: {
          id,
        },
        relations: {
          memberships: true,
        },
      })
      .then((user) => user.memberships);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        memberships: {
          company: true,
        },
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
