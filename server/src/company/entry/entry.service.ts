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

  async searchPaginated(companyId: number, query: string) {
    const searchParams = new URLSearchParams(query);
    const page = +searchParams.get('page') || 1;
    const take = +searchParams.get('size') || 10;
    const skip = (page - 1) * take;
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const description = searchParams.get('description');

    const dbQuery = this.repository
      .createQueryBuilder('entry')
      .leftJoinAndSelect('entry.transaction', 'transaction')
      .where('entry.companyId = :companyId', { companyId });
    if (dateFrom) {
      dbQuery.andWhere('entry.transaction.date >= :dateFrom', {
        dateFrom: new Date(dateFrom),
      });
    }
    if (dateTo) {
      dbQuery.andWhere('entry.transaction.date <= :dateTo', {
        dateTo: new Date(dateTo),
      });
    }
    if (description) {
      dbQuery.andWhere(
        'LOWER(transaction.description) LIKE LOWER(:description)',
        {
          description: `%${description}%`,
        },
      );
    }
    dbQuery.skip(skip).take(take);
    const [items, count] = await dbQuery.getManyAndCount();

    return { page: skip / take + 1, size: take, count, items };
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
