import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomTipoContratoService } from './nom-tipo-contrato.service';
import { CreateNomTipoContratoDto } from './dto/create-nom-tipo-contrato.dto';
import { UpdateNomTipoContratoDto } from './dto/update-nom-tipo-contrato.dto';

@Controller('nom-tipo-contrato')
export class NomTipoContratoController {
  constructor(private readonly nomTipoContratoService: NomTipoContratoService) {}

  @Post()
  create(@Body() createNomTipoContratoDto: CreateNomTipoContratoDto) {
    return this.nomTipoContratoService.create(createNomTipoContratoDto);
  }

  @Get()
  findAll() {
    return this.nomTipoContratoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomTipoContratoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomTipoContratoDto: UpdateNomTipoContratoDto) {
    return this.nomTipoContratoService.update(+id, updateNomTipoContratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomTipoContratoService.remove(+id);
  }
}
