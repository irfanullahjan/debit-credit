import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { EVENTS } from '../../common/constants';
import { EventsService } from '../../events/events.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
    @Inject(EventsService) private eventsService: EventsService,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    this.eventsService.server.emit(EVENTS.TRANSACTION, 'create');
    return this.repository.save(this.repository.create(createTransactionDto));
  }

  findAll() {
    return this.repository.find({
      order: { date: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['entries', 'entries.account', 'meta.createdByUser'],
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    this.eventsService.server.emit(EVENTS.TRANSACTION, 'update');
    return this.repository.update(id, updateTransactionDto);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
