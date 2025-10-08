import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomNominaDetalle } from './entities/nom-nomina-detalle.entity';
import { CreateNomNominaDetalleDto } from './dto/create-nom-nomina-detalle.dto';
import { UpdateNomNominaDetalleDto } from './dto/update-nom-nomina-detalle.dto';

@Injectable()
export class NomNominaDetalleService {
  constructor(
    @InjectRepository(NomNominaDetalle)
    private nominaDetalleRepository: Repository<NomNominaDetalle>,
  ) {}

  async create(createNomNominaDetalleDto: CreateNomNominaDetalleDto) {
    const nominaDetalle = this.nominaDetalleRepository.create(createNomNominaDetalleDto);
    return this.nominaDetalleRepository.save(nominaDetalle);
  }

  findAll() {
    return this.nominaDetalleRepository.find();
  }

  async findOne(id: number) {
    const nominaDetalle = await this.nominaDetalleRepository.findOneBy({ nodDetalleId: id });
    if (!nominaDetalle) {
      throw new NotFoundException(`Detalle de nómina con ID "${id}" no encontrado.`);
    }
    return nominaDetalle;
  }

  async update(id: number, updateNomNominaDetalleDto: UpdateNomNominaDetalleDto) {
    const nominaDetalle = await this.findOne(id);
    this.nominaDetalleRepository.merge(nominaDetalle, updateNomNominaDetalleDto);
    return this.nominaDetalleRepository.save(nominaDetalle);
  }

  async remove(id: number) {
    const nominaDetalle = await this.findOne(id);
    await this.nominaDetalleRepository.remove(nominaDetalle);
    return `Detalle de nómina con ID "${id}" eliminado exitosamente.`;
  }
}
