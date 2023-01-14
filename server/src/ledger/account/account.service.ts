import { Inject, Injectable } from '@nestjs/common';
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
    return this.repository.save(this.repository.create(createAccountDto));
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
    return this.repository.update(id, updateAccountDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
