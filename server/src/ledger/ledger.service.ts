import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLedgerEntryDto } from './dto/create-ledger-entry.dto';
import { UpdateLedgerEntryDto } from './dto/update-ledger-entry.dto';
import { LedgerEntry } from './entities/ledger-entry.entity';

@Injectable()
export class LedgerService {
  constructor(
    @InjectRepository(LedgerEntry)
    private repository: Repository<LedgerEntry>,
  ) {}

  create(createLedgerDto: CreateLedgerEntryDto) {
    return this.repository.save(this.repository.create(createLedgerDto));
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} ledger`;
  }

  update(id: number, updateLedgerDto: UpdateLedgerEntryDto) {
    return this.repository.update(id, updateLedgerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} ledger`;
  }
}
