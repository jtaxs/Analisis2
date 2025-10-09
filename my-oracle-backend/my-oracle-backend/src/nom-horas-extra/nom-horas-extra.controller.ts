import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NomHorasExtraService } from './nom-horas-extra.service';
import { CreateNomHorasExtraDto } from './dto/create-nom-horas-extra.dto';
import { UpdateNomHorasExtraDto } from './dto/update-nom-horas-extra.dto';

@Controller('nom-horas-extra')
export class NomHorasExtraController {
  constructor(private readonly nomHorasExtraService: NomHorasExtraService) {}

  @Post()
  create(@Body() createNomHorasExtraDto: CreateNomHorasExtraDto) {
    return this.nomHorasExtraService.create(createNomHorasExtraDto);
  }

  @Get()
  findAll() {
    return this.nomHorasExtraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.nomHorasExtraService.findOne(id);
  }

  // --- Endpoint añadido para el cálculo ---
  // Para usarlo, harías una petición a: GET /nom-horas-extra/123/calcular
  @Get(':id/calcular')
  calcularMonto(@Param('id', ParseIntPipe) id: number) {
    return this.nomHorasExtraService.calcularMonto(id);
  }
  // -----------------------------------------

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNomHorasExtraDto: UpdateNomHorasExtraDto) {
    return this.nomHorasExtraService.update(id, updateNomHorasExtraDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nomHorasExtraService.remove(id);
  }
}