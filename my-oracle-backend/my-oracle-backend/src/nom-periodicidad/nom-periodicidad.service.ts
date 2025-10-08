import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomPeriodicidad } from './entities/nom-periodicidad.entity';
import { CreateNomPeriodicidadDto } from './dto/create-nom-periodicidad.dto';
import { UpdateNomPeriodicidadDto } from './dto/update-nom-periodicidad.dto';

@Injectable()
export class NomPeriodicidadService {
  constructor(
    @InjectRepository(NomPeriodicidad)
    private periodicidadRepository: Repository<NomPeriodicidad>,
  ) {}

  async create(createNomPeriodicidadDto: CreateNomPeriodicidadDto) {
    const periodicidad = this.periodicidadRepository.create(createNomPeriodicidadDto);
    return this.periodicidadRepository.save(periodicidad);
  }

  findAll() {
    return this.periodicidadRepository.find();
  }

  async findOne(id: number) {
    const periodicidad = await this.periodicidadRepository.findOneBy({ perPeriodicidadId: id });
    if (!periodicidad) {
      throw new NotFoundException(`Periodicidad con ID "${id}" no encontrada.`);
    }
    return periodicidad;
  }

  async update(id: number, updateNomPeriodicidadDto: UpdateNomPeriodicidadDto) {
    const periodicidad = await this.findOne(id);
    this.periodicidadRepository.merge(periodicidad, updateNomPeriodicidadDto);
    return this.periodicidadRepository.save(periodicidad);
  }

  async remove(id: number) {
    const periodicidad = await this.findOne(id);
    await this.periodicidadRepository.remove(periodicidad);
    return `Periodicidad con ID "${id}" eliminada exitosamente.`;
  }
}
