import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomHorasExtraService } from './nom-horas-extra.service';
import { CreateNomHorasExtraDto } from './dto/create-nom-horas-extra.dto';
import { UpdateNomHorasExtraDto } from './dto/update-nom-horas-extra.dto';

@Controller('nom-horas-extra')
export class NomHorasExtraController {
  constructor(private readonly nomHorasExtraService: NomHorasExtraService) {}

  @Post()
  create(@Body() createNomHorasExtraDto: CreateNomHorasExtraDto) {
    return this.nomHorasExtraService.create(createNomHorasExtraDto);
  }

  @Get()
  findAll() {
    return this.nomHorasExtraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomHorasExtraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomHorasExtraDto: UpdateNomHorasExtraDto) {
    return this.nomHorasExtraService.update(+id, updateNomHorasExtraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomHorasExtraService.remove(+id);
  }
}
