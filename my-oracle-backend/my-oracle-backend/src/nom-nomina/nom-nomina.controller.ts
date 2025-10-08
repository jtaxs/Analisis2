import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomNominaService } from './nom-nomina.service';
import { CreateNomNominaDto } from './dto/create-nom-nomina.dto';
import { UpdateNomNominaDto } from './dto/update-nom-nomina.dto';

@Controller('nom-nomina')
export class NomNominaController {
  constructor(private readonly nomNominaService: NomNominaService) {}

  @Post()
  create(@Body() createNomNominaDto: CreateNomNominaDto) {
    return this.nomNominaService.create(createNomNominaDto);
  }

  @Get()
  findAll() {
    return this.nomNominaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomNominaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomNominaDto: UpdateNomNominaDto) {
    return this.nomNominaService.update(+id, updateNomNominaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomNominaService.remove(+id);
  }
}
