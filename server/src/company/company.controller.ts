import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { CompanyGuard } from './company.guard';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.companyService.findAll(req.user.userId);
  }

  @Get(':companyId')
  @UseGuards(CompanyGuard)
  findOne(@Param('companyId') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':companyId')
  @UseGuards(CompanyGuard)
  update(
    @Param('companyId') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':companyId')
  @UseGuards(CompanyGuard)
  remove(@Param('companyId') companyId: string, @Req() req: any) {
    return this.companyService.remove(+companyId, req.user.userId);
  }
}
