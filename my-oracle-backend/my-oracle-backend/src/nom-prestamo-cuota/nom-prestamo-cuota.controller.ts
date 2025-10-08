import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomPrestamoCuotaService } from './nom-prestamo-cuota.service';
import { CreateNomPrestamoCuotaDto } from './dto/create-nom-prestamo-cuota.dto';
import { UpdateNomPrestamoCuotaDto } from './dto/update-nom-prestamo-cuota.dto';

@Controller('nom-prestamo-cuota')
export class NomPrestamoCuotaController {
  constructor(private readonly nomPrestamoCuotaService: NomPrestamoCuotaService) {}

  @Post()
  create(@Body() createNomPrestamoCuotaDto: CreateNomPrestamoCuotaDto) {
    return this.nomPrestamoCuotaService.create(createNomPrestamoCuotaDto);
  }

  @Get()
  findAll() {
    return this.nomPrestamoCuotaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomPrestamoCuotaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomPrestamoCuotaDto: UpdateNomPrestamoCuotaDto) {
    return this.nomPrestamoCuotaService.update(+id, updateNomPrestamoCuotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomPrestamoCuotaService.remove(+id);
  }
}
