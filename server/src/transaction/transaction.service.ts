import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
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
      relations: ['entries', 'entries.account'],
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.repository.update(id, updateTransactionDto);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
