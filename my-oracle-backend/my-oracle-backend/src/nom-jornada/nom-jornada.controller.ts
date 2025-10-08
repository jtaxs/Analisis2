import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomJornadaService } from './nom-jornada.service';
import { CreateNomJornadaDto } from './dto/create-nom-jornada.dto';
import { UpdateNomJornadaDto } from './dto/update-nom-jornada.dto';

@Controller('nom-jornada')
export class NomJornadaController {
  constructor(private readonly nomJornadaService: NomJornadaService) {}

  @Post()
  create(@Body() createNomJornadaDto: CreateNomJornadaDto) {
    return this.nomJornadaService.create(createNomJornadaDto);
  }

  @Get()
  findAll() {
    return this.nomJornadaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomJornadaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomJornadaDto: UpdateNomJornadaDto) {
    return this.nomJornadaService.update(+id, updateNomJornadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomJornadaService.remove(+id);
  }
}
