import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomIgssParamService } from './nom-igss-param.service';
import { CreateNomIgssParamDto } from './dto/create-nom-igss-param.dto';
import { UpdateNomIgssParamDto } from './dto/update-nom-igss-param.dto';

@Controller('nom-igss-param')
export class NomIgssParamController {
  constructor(private readonly nomIgssParamService: NomIgssParamService) {}

  @Post()
  create(@Body() createNomIgssParamDto: CreateNomIgssParamDto) {
    return this.nomIgssParamService.create(createNomIgssParamDto);
  }

  @Get()
  findAll() {
    return this.nomIgssParamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomIgssParamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomIgssParamDto: UpdateNomIgssParamDto) {
    return this.nomIgssParamService.update(+id, updateNomIgssParamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomIgssParamService.remove(+id);
  }
}
