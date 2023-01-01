import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private repository: Repository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.repository.save(createAccountDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneOrFail({ where: { id } });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.repository.update(id, updateAccountDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
