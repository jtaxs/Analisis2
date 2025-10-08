import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomLiquidacion } from './entities/nom-liquidacion.entity';
import { CreateNomLiquidacionDto } from './dto/create-nom-liquidacion.dto';
import { UpdateNomLiquidacionDto } from './dto/update-nom-liquidacion.dto';

@Injectable()
export class NomLiquidacionService {
  constructor(
    @InjectRepository(NomLiquidacion)
    private liquidacionRepository: Repository<NomLiquidacion>,
  ) {}

  async create(createNomLiquidacionDto: CreateNomLiquidacionDto) {
    const liquidacion = this.liquidacionRepository.create(createNomLiquidacionDto);
    return this.liquidacionRepository.save(liquidacion);
  }

  findAll() {
    return this.liquidacionRepository.find();
  }

  async findOne(id: number) {
    const liquidacion = await this.liquidacionRepository.findOneBy({ liqLiqId: id });
    if (!liquidacion) {
      throw new NotFoundException(`Liquidación con ID "${id}" no encontrada.`);
    }
    return liquidacion;
  }

  async update(id: number, updateNomLiquidacionDto: UpdateNomLiquidacionDto) {
    const liquidacion = await this.findOne(id);
    this.liquidacionRepository.merge(liquidacion, updateNomLiquidacionDto);
    return this.liquidacionRepository.save(liquidacion);
  }

  async remove(id: number) {
    const liquidacion = await this.findOne(id);
    await this.liquidacionRepository.remove(liquidacion);
    return `Liquidación con ID "${id}" eliminada exitosamente.`;
  }
}
