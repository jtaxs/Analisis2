import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomBonoService } from './nom-bono.service';
import { CreateNomBonoDto } from './dto/create-nom-bono.dto';
import { UpdateNomBonoDto } from './dto/update-nom-bono.dto';

@Controller('nom-bono')
export class NomBonoController {
  constructor(private readonly nomBonoService: NomBonoService) {}

  @Post()
  create(@Body() createNomBonoDto: CreateNomBonoDto) {
    return this.nomBonoService.create(createNomBonoDto);
  }

  @Get()
  findAll() {
    return this.nomBonoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomBonoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomBonoDto: UpdateNomBonoDto) {
    return this.nomBonoService.update(+id, updateNomBonoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomBonoService.remove(+id);
  }
}
