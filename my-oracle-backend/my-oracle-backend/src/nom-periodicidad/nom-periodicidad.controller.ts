import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomPeriodicidadService } from './nom-periodicidad.service';
import { CreateNomPeriodicidadDto } from './dto/create-nom-periodicidad.dto';
import { UpdateNomPeriodicidadDto } from './dto/update-nom-periodicidad.dto';

@Controller('nom-periodicidad')
export class NomPeriodicidadController {
  constructor(private readonly nomPeriodicidadService: NomPeriodicidadService) {}

  @Post()
  create(@Body() createNomPeriodicidadDto: CreateNomPeriodicidadDto) {
    return this.nomPeriodicidadService.create(createNomPeriodicidadDto);
  }

  @Get()
  findAll() {
    return this.nomPeriodicidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomPeriodicidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomPeriodicidadDto: UpdateNomPeriodicidadDto) {
    return this.nomPeriodicidadService.update(+id, updateNomPeriodicidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomPeriodicidadService.remove(+id);
  }
}
