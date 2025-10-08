import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomDepartamentoService } from './nom-departamento.service';
import { CreateNomDepartamentoDto } from './dto/create-nom-departamento.dto';
import { UpdateNomDepartamentoDto } from './dto/update-nom-departamento.dto';

@Controller('nom-departamento')
export class NomDepartamentoController {
  constructor(private readonly nomDepartamentoService: NomDepartamentoService) {}

  @Post()
  create(@Body() createNomDepartamentoDto: CreateNomDepartamentoDto) {
    return this.nomDepartamentoService.create(createNomDepartamentoDto);
  }

  @Get()
  findAll() {
    return this.nomDepartamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomDepartamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomDepartamentoDto: UpdateNomDepartamentoDto) {
    return this.nomDepartamentoService.update(+id, updateNomDepartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomDepartamentoService.remove(+id);
  }
}
