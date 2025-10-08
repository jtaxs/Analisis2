import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomBancoService } from './nom-banco.service';
import { CreateNomBancoDto } from './dto/create-nom-banco.dto';
import { UpdateNomBancoDto } from './dto/update-nom-banco.dto';

@Controller('nom-banco')
export class NomBancoController {
  constructor(private readonly nomBancoService: NomBancoService) {}

  @Post()
  create(@Body() createNomBancoDto: CreateNomBancoDto) {
    return this.nomBancoService.create(createNomBancoDto);
  }

  @Get()
  findAll() {
    return this.nomBancoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomBancoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomBancoDto: UpdateNomBancoDto) {
    return this.nomBancoService.update(+id, updateNomBancoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomBancoService.remove(+id);
  }
}
