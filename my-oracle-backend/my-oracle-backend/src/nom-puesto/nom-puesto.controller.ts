import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomPuestoService } from './nom-puesto.service';
import { CreateNomPuestoDto } from './dto/create-nom-puesto.dto';
import { UpdateNomPuestoDto } from './dto/update-nom-puesto.dto';

@Controller('nom-puesto')
export class NomPuestoController {
  constructor(private readonly nomPuestoService: NomPuestoService) {}

  @Post()
  create(@Body() createNomPuestoDto: CreateNomPuestoDto) {
    return this.nomPuestoService.create(createNomPuestoDto);
  }

  @Get()
  findAll() {
    return this.nomPuestoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomPuestoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomPuestoDto: UpdateNomPuestoDto) {
    return this.nomPuestoService.update(+id, updateNomPuestoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomPuestoService.remove(+id);
  }
}
