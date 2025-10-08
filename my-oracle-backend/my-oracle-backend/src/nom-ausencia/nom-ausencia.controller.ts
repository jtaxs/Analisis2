import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomAusenciaService } from './nom-ausencia.service';
import { CreateNomAusenciaDto } from './dto/create-nom-ausencia.dto';
import { UpdateNomAusenciaDto } from './dto/update-nom-ausencia.dto';

@Controller('nom-ausencia')
export class NomAusenciaController {
  constructor(private readonly nomAusenciaService: NomAusenciaService) {}

  @Post()
  create(@Body() createNomAusenciaDto: CreateNomAusenciaDto) {
    return this.nomAusenciaService.create(createNomAusenciaDto);
  }

  @Get()
  findAll() {
    return this.nomAusenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomAusenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomAusenciaDto: UpdateNomAusenciaDto) {
    return this.nomAusenciaService.update(+id, updateNomAusenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomAusenciaService.remove(+id);
  }
}
