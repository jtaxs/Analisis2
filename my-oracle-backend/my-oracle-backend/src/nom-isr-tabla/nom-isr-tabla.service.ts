import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomIsrTabla } from './entities/nom-isr-tabla.entity';
import { CreateNomIsrTablaDto } from './dto/create-nom-isr-tabla.dto';
import { UpdateNomIsrTablaDto } from './dto/update-nom-isr-tabla.dto';

@Injectable()
export class NomIsrTablaService {
  constructor(
    @InjectRepository(NomIsrTabla)
    private isrTablaRepository: Repository<NomIsrTabla>,
  ) {}

  async create(createNomIsrTablaDto: CreateNomIsrTablaDto) {
    const isrTabla = this.isrTablaRepository.create(createNomIsrTablaDto);
    return this.isrTablaRepository.save(isrTabla);
  }

  findAll() {
    return this.isrTablaRepository.find();
  }

  async findOne(id: number) {
    const isrTabla = await this.isrTablaRepository.findOneBy({ isrTablaId: id });
    if (!isrTabla) {
      throw new NotFoundException(`Tabla ISR con ID "${id}" no encontrada.`);
    }
    return isrTabla;
  }

  async update(id: number, updateNomIsrTablaDto: UpdateNomIsrTablaDto) {
    const isrTabla = await this.findOne(id);
    this.isrTablaRepository.merge(isrTabla, updateNomIsrTablaDto);
    return this.isrTablaRepository.save(isrTabla);
  }

  async remove(id: number) {
    const isrTabla = await this.findOne(id);
    await this.isrTablaRepository.remove(isrTabla);
    return `Tabla ISR con ID "${id}" eliminada exitosamente.`;
  }
}
