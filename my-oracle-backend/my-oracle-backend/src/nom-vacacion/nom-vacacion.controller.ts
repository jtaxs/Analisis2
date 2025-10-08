import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomVacacionService } from './nom-vacacion.service';
import { CreateNomVacacionDto } from './dto/create-nom-vacacion.dto';
import { UpdateNomVacacionDto } from './dto/update-nom-vacacion.dto';

@Controller('nom-vacacion')
export class NomVacacionController {
  constructor(private readonly nomVacacionService: NomVacacionService) {}

  @Post()
  create(@Body() createNomVacacionDto: CreateNomVacacionDto) {
    return this.nomVacacionService.create(createNomVacacionDto);
  }

  @Get()
  findAll() {
    return this.nomVacacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomVacacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomVacacionDto: UpdateNomVacacionDto) {
    return this.nomVacacionService.update(+id, updateNomVacacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomVacacionService.remove(+id);
  }
}
