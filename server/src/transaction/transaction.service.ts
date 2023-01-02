import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
// import { LedgerEntry } from '../ledger/entities/ledger-entry.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
    private dataSource: DataSource,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.repository.save(this.repository.create(createTransactionDto));
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        ledgerEntries: true,
      },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.repository.update(id, updateTransactionDto);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
