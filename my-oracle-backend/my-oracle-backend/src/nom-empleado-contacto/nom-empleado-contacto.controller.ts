import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomEmpleadoContactoService } from './nom-empleado-contacto.service';
import { CreateNomEmpleadoContactoDto } from './dto/create-nom-empleado-contacto.dto';
import { UpdateNomEmpleadoContactoDto } from './dto/update-nom-empleado-contacto.dto';

@Controller('nom-empleado-contacto')
export class NomEmpleadoContactoController {
  constructor(private readonly nomEmpleadoContactoService: NomEmpleadoContactoService) {}

  @Post()
  create(@Body() createNomEmpleadoContactoDto: CreateNomEmpleadoContactoDto) {
    return this.nomEmpleadoContactoService.create(createNomEmpleadoContactoDto);
  }

  @Get()
  findAll() {
    return this.nomEmpleadoContactoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomEmpleadoContactoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomEmpleadoContactoDto: UpdateNomEmpleadoContactoDto) {
    return this.nomEmpleadoContactoService.update(+id, updateNomEmpleadoContactoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomEmpleadoContactoService.remove(+id);
  }
}
