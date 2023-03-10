import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EventsService } from '../../events/events.service';
import { Account } from '../account/entities/account.entity';
import { Entry } from '../entry/entities/entry.entity';
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

  async create(companyId: number, createTransactionDto: CreateTransactionDto) {
    await this.validateAccountIds(createTransactionDto, companyId);
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
      relations: [
        'entries',
        'entries.account',
        'meta.createdByUser',
        'meta.updatedByUser',
      ],
    });
  }

  async update(
    companyId: number,
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.validateAccountIds(updateTransactionDto, companyId);
    const transaction = await this.repository.findOneOrFail({
      where: {
        id,
        companyId,
      },
      relations: ['entries'],
    });
    Object.assign(transaction, updateTransactionDto);
    transaction.entries = transaction.entries.map(
      (entry) => new Entry(entry, companyId),
    );
    return this.repository.save(transaction).then((transaction) => {
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

  private async validateAccountIds(
    updateTransactionDto: UpdateTransactionDto,
    companyId: number,
  ) {
    const accountIds = [
      ...new Set(updateTransactionDto.entries.map((entry) => entry.accountId)),
    ];
    const accounts = await this.repository.manager.getRepository(Account).find({
      where: { id: In(accountIds), companyId },
    });
    if (accounts.length !== accountIds.length) {
      throw new BadRequestException('One or more account ids are invalid');
    }
  }
}
