import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomIsrTablaService } from './nom-isr-tabla.service';
import { CreateNomIsrTablaDto } from './dto/create-nom-isr-tabla.dto';
import { UpdateNomIsrTablaDto } from './dto/update-nom-isr-tabla.dto';

@Controller('nom-isr-tabla')
export class NomIsrTablaController {
  constructor(private readonly nomIsrTablaService: NomIsrTablaService) {}

  @Post()
  create(@Body() createNomIsrTablaDto: CreateNomIsrTablaDto) {
    return this.nomIsrTablaService.create(createNomIsrTablaDto);
  }

  @Get()
  findAll() {
    return this.nomIsrTablaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomIsrTablaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomIsrTablaDto: UpdateNomIsrTablaDto) {
    return this.nomIsrTablaService.update(+id, updateNomIsrTablaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomIsrTablaService.remove(+id);
  }
}
