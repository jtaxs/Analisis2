import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomPeriodoNominaService } from './nom-periodo-nomina.service';
import { CreateNomPeriodoNominaDto } from './dto/create-nom-periodo-nomina.dto';
import { UpdateNomPeriodoNominaDto } from './dto/update-nom-periodo-nomina.dto';

@Controller('nom-periodo-nomina')
export class NomPeriodoNominaController {
  constructor(private readonly nomPeriodoNominaService: NomPeriodoNominaService) {}

  @Post()
  create(@Body() createNomPeriodoNominaDto: CreateNomPeriodoNominaDto) {
    return this.nomPeriodoNominaService.create(createNomPeriodoNominaDto);
  }

  @Get()
  findAll() {
    return this.nomPeriodoNominaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomPeriodoNominaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomPeriodoNominaDto: UpdateNomPeriodoNominaDto) {
    return this.nomPeriodoNominaService.update(+id, updateNomPeriodoNominaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomPeriodoNominaService.remove(+id);
  }
}
