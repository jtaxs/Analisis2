import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomEmpleadoService } from './nom-empleado.service';
import { CreateNomEmpleadoDto } from './dto/create-nom-empleado.dto';
import { UpdateNomEmpleadoDto } from './dto/update-nom-empleado.dto';

@Controller('nom-empleado')
export class NomEmpleadoController {
  constructor(private readonly nomEmpleadoService: NomEmpleadoService) {}

  @Post()
  create(@Body() createNomEmpleadoDto: CreateNomEmpleadoDto) {
    return this.nomEmpleadoService.create(createNomEmpleadoDto);
  }

  @Get()
  findAll() {
    return this.nomEmpleadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomEmpleadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomEmpleadoDto: UpdateNomEmpleadoDto) {
    return this.nomEmpleadoService.update(+id, updateNomEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomEmpleadoService.remove(+id);
  }
}
