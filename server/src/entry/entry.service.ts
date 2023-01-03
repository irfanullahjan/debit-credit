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

  create(createEntryDto: CreateEntryDto) {
    return this.repository.save(this.repository.create(createEntryDto));
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} entry`;
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return this.repository.update(id, updateEntryDto);
  }

  remove(id: number) {
    return `This action removes a #${id} entry`;
  }
}
