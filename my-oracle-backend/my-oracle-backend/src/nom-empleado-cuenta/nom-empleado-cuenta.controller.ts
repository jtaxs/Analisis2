import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomEmpleadoCuentaService } from './nom-empleado-cuenta.service';
import { CreateNomEmpleadoCuentaDto } from './dto/create-nom-empleado-cuenta.dto';
import { UpdateNomEmpleadoCuentaDto } from './dto/update-nom-empleado-cuenta.dto';

@Controller('nom-empleado-cuenta')
export class NomEmpleadoCuentaController {
  constructor(private readonly nomEmpleadoCuentaService: NomEmpleadoCuentaService) {}

  @Post()
  create(@Body() createNomEmpleadoCuentaDto: CreateNomEmpleadoCuentaDto) {
    return this.nomEmpleadoCuentaService.create(createNomEmpleadoCuentaDto);
  }

  @Get()
  findAll() {
    return this.nomEmpleadoCuentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomEmpleadoCuentaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomEmpleadoCuentaDto: UpdateNomEmpleadoCuentaDto) {
    return this.nomEmpleadoCuentaService.update(+id, updateNomEmpleadoCuentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomEmpleadoCuentaService.remove(+id);
  }
}
