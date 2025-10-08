import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomPrestamoService } from './nom-prestamo.service';
import { CreateNomPrestamoDto } from './dto/create-nom-prestamo.dto';
import { UpdateNomPrestamoDto } from './dto/update-nom-prestamo.dto';

@Controller('nom-prestamo')
export class NomPrestamoController {
  constructor(private readonly nomPrestamoService: NomPrestamoService) {}

  @Post()
  create(@Body() createNomPrestamoDto: CreateNomPrestamoDto) {
    return this.nomPrestamoService.create(createNomPrestamoDto);
  }

  @Get()
  findAll() {
    return this.nomPrestamoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomPrestamoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomPrestamoDto: UpdateNomPrestamoDto) {
    return this.nomPrestamoService.update(+id, updateNomPrestamoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomPrestamoService.remove(+id);
  }
}
