import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanyGuard } from '../company.guard';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller()
@UseGuards(CompanyGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountService.create(+companyId, createAccountDto);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.accountService.findAll(+companyId);
  }

  @Get(':id')
  findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.accountService.findOne(+companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(+companyId, +id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.accountService.remove(+companyId, +id);
  }
}
