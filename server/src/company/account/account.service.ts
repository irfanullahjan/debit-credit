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

  create(companyId: number, createAccountDto: CreateAccountDto) {
    return this.repository
      .save(new Account(createAccountDto, companyId))
      .then((account) => {
        this.eventsService.server.emit(EVENTS.TRANSACTION, 'create');
        return account;
      });
  }

  findAll(companyId: number) {
    return this.repository.find({
      order: { balance: 'DESC' },
      where: { companyId },
    });
  }

  findOne(companyId: number, id: number) {
    return this.repository.findOneOrFail({
      where: { id, companyId },
      relations: ['entries', 'entries.transaction'],
    });
  }

  update(companyId: number, id: number, updateAccountDto: UpdateAccountDto) {
    return this.repository
      .update({ id, companyId }, new Account(updateAccountDto, companyId))
      .then((account) => {
        this.eventsService.server.emit(EVENTS.TRANSACTION, 'update');
        return account;
      });
  }

  async remove(companyId: number, id: number) {
    const account = await this.findOne(companyId, id);
    if (account) {
      return this.repository.softRemove(account).then(() => {
        this.eventsService.server.emit(EVENTS.TRANSACTION, 'remove');
        return account;
      });
    }
    throw new NotFoundException();
  }
}
