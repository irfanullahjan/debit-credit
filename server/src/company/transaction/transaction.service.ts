import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from '../../events/events.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
    @Inject(EventsService) private eventsService: EventsService,
  ) {}

  create(companyId: number, createTransactionDto: CreateTransactionDto) {
    return this.repository
      .save(new Transaction(createTransactionDto, companyId))
      .then((transaction) => {
        this.eventsService.server.emit(
          `company:${companyId}`,
          `Transaction ${transaction.id} created`,
        );
        return transaction;
      });
  }

  findAll(companyId: number) {
    return this.repository.find({
      where: { companyId },
      order: { date: 'DESC' },
    });
  }

  findOne(companyId: number, id: number) {
    return this.repository.findOne({
      where: { id, companyId },
      relations: ['entries', 'entries.account', 'meta.createdByUser'],
    });
  }

  update(
    companyId: number,
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.repository
      .update(id, new Transaction(updateTransactionDto, companyId))
      .then((transaction) => {
        this.eventsService.server.emit(
          `company:${companyId}`,
          `Transaction ${id} updated`,
        );
        return transaction;
      });
  }

  remove(companyId: number, id: number) {
    return this.repository.softDelete({ id, companyId }).then(() => {
      this.eventsService.server.emit(
        `company:${companyId}`,
        `Transaction ${id} deleted`,
      );
      return id;
    });
  }
}
