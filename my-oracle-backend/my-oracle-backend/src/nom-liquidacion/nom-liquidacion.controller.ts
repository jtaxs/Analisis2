import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomLiquidacionService } from './nom-liquidacion.service';
import { CreateNomLiquidacionDto } from './dto/create-nom-liquidacion.dto';
import { UpdateNomLiquidacionDto } from './dto/update-nom-liquidacion.dto';

@Controller('nom-liquidacion')
export class NomLiquidacionController {
  constructor(private readonly nomLiquidacionService: NomLiquidacionService) {}

  @Post()
  create(@Body() createNomLiquidacionDto: CreateNomLiquidacionDto) {
    return this.nomLiquidacionService.create(createNomLiquidacionDto);
  }

  @Get()
  findAll() {
    return this.nomLiquidacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomLiquidacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomLiquidacionDto: UpdateNomLiquidacionDto) {
    return this.nomLiquidacionService.update(+id, updateNomLiquidacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomLiquidacionService.remove(+id);
  }
}
