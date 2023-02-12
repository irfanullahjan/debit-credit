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
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MembershipService } from './membership.service';

@Controller()
@UseGuards(CompanyGuard)
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() createMembershipDto: CreateMembershipDto,
  ) {
    return this.membershipService.create(+companyId, createMembershipDto);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.membershipService.findAll(+companyId);
  }

  @Get(':id')
  findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.membershipService.findOne(+companyId, +id);
  }

  @Patch(':id')
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipService.update(+companyId, +id, updateMembershipDto);
  }

  @Delete(':id')
  remove(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.membershipService.remove(+companyId, +id);
  }
}
