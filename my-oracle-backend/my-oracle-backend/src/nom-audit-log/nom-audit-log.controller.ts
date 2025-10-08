import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomAuditLogService } from './nom-audit-log.service';
import { CreateNomAuditLogDto } from './dto/create-nom-audit-log.dto';
import { UpdateNomAuditLogDto } from './dto/update-nom-audit-log.dto';

@Controller('nom-audit-log')
export class NomAuditLogController {
  constructor(private readonly nomAuditLogService: NomAuditLogService) {}

  @Post()
  create(@Body() createNomAuditLogDto: CreateNomAuditLogDto) {
    return this.nomAuditLogService.create(createNomAuditLogDto);
  }

  @Get()
  findAll() {
    return this.nomAuditLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomAuditLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomAuditLogDto: UpdateNomAuditLogDto) {
    return this.nomAuditLogService.update(+id, updateNomAuditLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomAuditLogService.remove(+id);
  }
}
