import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  ILike,
  Between,
} from 'typeorm';
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
    const take = +searchParams.get('size') || 1000;
    const skip = (page - 1) * take;
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const description = searchParams.get('description');
    const accountId = +searchParams.get('accountId');
    const amountFrom = searchParams.get('amountFrom');
    const amountTo = searchParams.get('amountTo');

    const [items, count] = await this.repository.findAndCount({
      relations: ['account', 'transaction'],
      where: {
        companyId,
        ...(accountId && { accountId }),
        amount: this.filterNumberRange(amountFrom, amountTo),
        transaction: this.filterByTransaction(dateFrom, dateTo, description),
      },
      order: { transaction: { date: 'DESC' } },
      skip,
      take,
    });

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

  private filterNumberRange(from: string, to: string) {
    if (from && to) {
      return Between(+from, +to);
    } else if (from) {
      return MoreThanOrEqual(+from);
    } else if (to) {
      return LessThanOrEqual(+to);
    }
  }

  private filterDateRange(from: string, to: string) {
    if (from && to) {
      return Between(new Date(from), new Date(to));
    } else if (from) {
      return MoreThanOrEqual(new Date(from));
    } else if (to) {
      return LessThanOrEqual(new Date(to));
    }
  }

  private filterByTransaction(
    dateFrom: string,
    dateTo: string,
    description: string,
  ) {
    if (dateFrom || dateTo || description) {
      return {
        date: this.filterDateRange(dateFrom, dateTo),
        ...(description && { description: ILike(`%${description}%`) }),
      };
    }
  }
}
