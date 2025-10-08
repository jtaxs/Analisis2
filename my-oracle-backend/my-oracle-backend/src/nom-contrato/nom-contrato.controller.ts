import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomContratoService } from './nom-contrato.service';
import { CreateNomContratoDto } from './dto/create-nom-contrato.dto';
import { UpdateNomContratoDto } from './dto/update-nom-contrato.dto';

@Controller('nom-contrato')
export class NomContratoController {
  constructor(private readonly nomContratoService: NomContratoService) {}

  @Post()
  create(@Body() createNomContratoDto: CreateNomContratoDto) {
    return this.nomContratoService.create(createNomContratoDto);
  }

  @Get()
  findAll() {
    return this.nomContratoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomContratoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomContratoDto: UpdateNomContratoDto) {
    return this.nomContratoService.update(+id, updateNomContratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomContratoService.remove(+id);
  }
}
