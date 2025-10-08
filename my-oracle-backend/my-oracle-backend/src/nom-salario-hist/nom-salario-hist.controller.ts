import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomSalarioHistService } from './nom-salario-hist.service';
import { CreateNomSalarioHistDto } from './dto/create-nom-salario-hist.dto';
import { UpdateNomSalarioHistDto } from './dto/update-nom-salario-hist.dto';

@Controller('nom-salario-hist')
export class NomSalarioHistController {
  constructor(private readonly nomSalarioHistService: NomSalarioHistService) {}

  @Post()
  create(@Body() createNomSalarioHistDto: CreateNomSalarioHistDto) {
    return this.nomSalarioHistService.create(createNomSalarioHistDto);
  }

  @Get()
  findAll() {
    return this.nomSalarioHistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomSalarioHistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomSalarioHistDto: UpdateNomSalarioHistDto) {
    return this.nomSalarioHistService.update(+id, updateNomSalarioHistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomSalarioHistService.remove(+id);
  }
}
