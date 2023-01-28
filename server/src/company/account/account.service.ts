import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EVENTS } from '../../common/constants';
import { EventsService } from '../../events/events.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private repository: Repository<Account>,
    @Inject(EventsService) private eventsService: EventsService,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    this.eventsService.server.emit(EVENTS.TRANSACTION, 'create');
    return this.repository.save(new Account(createAccountDto));
  }

  findAll() {
    return this.repository.find({
      order: { balance: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.repository.findOneOrFail({
      where: { id },
      relations: ['entries', 'entries.transaction'],
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    this.eventsService.server.emit(EVENTS.TRANSACTION, 'update');
    return this.repository.update(id, new Account(updateAccountDto));
  }

  async remove(id: number) {
    const account = await this.findOne(id);
    if (account) {
      return this.repository.softRemove(account).then(() => {
        this.eventsService.server.emit(EVENTS.TRANSACTION, 'remove');
        return account;
      });
    }
    throw new NotFoundException();
  }
}
