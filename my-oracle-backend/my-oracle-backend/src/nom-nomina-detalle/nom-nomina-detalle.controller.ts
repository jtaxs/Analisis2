import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomNominaDetalleService } from './nom-nomina-detalle.service';
import { CreateNomNominaDetalleDto } from './dto/create-nom-nomina-detalle.dto';
import { UpdateNomNominaDetalleDto } from './dto/update-nom-nomina-detalle.dto';

@Controller('nom-nomina-detalle')
export class NomNominaDetalleController {
  constructor(private readonly nomNominaDetalleService: NomNominaDetalleService) {}

  @Post()
  create(@Body() createNomNominaDetalleDto: CreateNomNominaDetalleDto) {
    return this.nomNominaDetalleService.create(createNomNominaDetalleDto);
  }

  @Get()
  findAll() {
    return this.nomNominaDetalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomNominaDetalleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomNominaDetalleDto: UpdateNomNominaDetalleDto) {
    return this.nomNominaDetalleService.update(+id, updateNomNominaDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomNominaDetalleService.remove(+id);
  }
}
