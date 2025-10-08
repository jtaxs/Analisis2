import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomVacacion } from './entities/nom-vacacion.entity';
import { CreateNomVacacionDto } from './dto/create-nom-vacacion.dto';
import { UpdateNomVacacionDto } from './dto/update-nom-vacacion.dto';

@Injectable()
export class NomVacacionService {
  constructor(
    @InjectRepository(NomVacacion)
    private vacacionRepository: Repository<NomVacacion>,
  ) {}

  async create(createNomVacacionDto: CreateNomVacacionDto) {
    const vacacion = this.vacacionRepository.create(createNomVacacionDto);
    return this.vacacionRepository.save(vacacion);
  }

  findAll() {
    return this.vacacionRepository.find();
  }

  async findOne(id: number) {
    const vacacion = await this.vacacionRepository.findOneBy({ vacVacacionId: id });
    if (!vacacion) {
      throw new NotFoundException(`Registro de vacación con ID "${id}" no encontrado.`);
    }
    return vacacion;
  }

  async update(id: number, updateNomVacacionDto: UpdateNomVacacionDto) {
    const vacacion = await this.findOne(id);
    this.vacacionRepository.merge(vacacion, updateNomVacacionDto);
    return this.vacacionRepository.save(vacacion);
  }

  async remove(id: number) {
    const vacacion = await this.findOne(id);
    await this.vacacionRepository.remove(vacacion);
    return `Registro de vacación con ID "${id}" eliminado exitosamente.`;
  }
}
