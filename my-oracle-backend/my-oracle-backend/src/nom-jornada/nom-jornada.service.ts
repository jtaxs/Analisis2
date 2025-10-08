import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomJornada } from './entities/nom-jornada.entity';
import { CreateNomJornadaDto } from './dto/create-nom-jornada.dto';
import { UpdateNomJornadaDto } from './dto/update-nom-jornada.dto';

@Injectable()
export class NomJornadaService {
  constructor(
    @InjectRepository(NomJornada)
    private jornadaRepository: Repository<NomJornada>,
  ) {}

  async create(createNomJornadaDto: CreateNomJornadaDto) {
    const jornada = this.jornadaRepository.create(createNomJornadaDto);
    return this.jornadaRepository.save(jornada);
  }

  findAll() {
    return this.jornadaRepository.find();
  }

  async findOne(id: number) {
    const jornada = await this.jornadaRepository.findOneBy({ jorJornadaId: id });
    if (!jornada) {
      throw new NotFoundException(`Jornada con ID "${id}" no encontrada.`);
    }
    return jornada;
  }

  async update(id: number, updateNomJornadaDto: UpdateNomJornadaDto) {
    const jornada = await this.findOne(id);
    this.jornadaRepository.merge(jornada, updateNomJornadaDto);
    return this.jornadaRepository.save(jornada);
  }

  async remove(id: number) {
    const jornada = await this.findOne(id);
    await this.jornadaRepository.remove(jornada);
    return `Jornada con ID "${id}" eliminada exitosamente.`;
  }
}
