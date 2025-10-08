import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomConceptoService } from './nom-concepto.service';
import { CreateNomConceptoDto } from './dto/create-nom-concepto.dto';
import { UpdateNomConceptoDto } from './dto/update-nom-concepto.dto';

@Controller('nom-concepto')
export class NomConceptoController {
  constructor(private readonly nomConceptoService: NomConceptoService) {}

  @Post()
  create(@Body() createNomConceptoDto: CreateNomConceptoDto) {
    return this.nomConceptoService.create(createNomConceptoDto);
  }

  @Get()
  findAll() {
    return this.nomConceptoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomConceptoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomConceptoDto: UpdateNomConceptoDto) {
    return this.nomConceptoService.update(+id, updateNomConceptoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomConceptoService.remove(+id);
  }
}
