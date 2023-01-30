import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private repository: Repository<Entry>,
  ) {}

  create(companyId: number, createEntryDto: CreateEntryDto) {
    return this.repository.save(new Entry(createEntryDto, companyId));
  }

  findAll(companyId: number) {
    return this.repository.find({
      where: { companyId },
      order: { date: 'DESC' },
    });
  }

  findOne(companyId: number, id: number) {
    return `This action returns a #${id} entry`;
  }

  update(companyId: number, id: number, updateEntryDto: UpdateEntryDto) {
    return this.repository.update(id, new Entry(updateEntryDto, companyId));
  }

  remove(companyId: number, id: number) {
    return `This action removes a #${id} entry`;
  }
}
