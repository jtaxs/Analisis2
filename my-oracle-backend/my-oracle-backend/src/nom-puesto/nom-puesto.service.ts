import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomPuesto } from './entities/nom-puesto.entity';
import { CreateNomPuestoDto } from './dto/create-nom-puesto.dto';
import { UpdateNomPuestoDto } from './dto/update-nom-puesto.dto';

@Injectable()
export class NomPuestoService {
  constructor(
    @InjectRepository(NomPuesto)
    private puestoRepository: Repository<NomPuesto>,
  ) {}

  async create(createNomPuestoDto: CreateNomPuestoDto) {
    const puesto = this.puestoRepository.create(createNomPuestoDto);
    return this.puestoRepository.save(puesto);
  }

  findAll() {
    return this.puestoRepository.find();
  }

  async findOne(id: number) {
    const puesto = await this.puestoRepository.findOneBy({ puePuestoId: id });
    if (!puesto) {
      throw new NotFoundException(`Puesto con ID "${id}" no encontrado.`);
    }
    return puesto;
  }

  async update(id: number, updateNomPuestoDto: UpdateNomPuestoDto) {
    const puesto = await this.findOne(id);
    this.puestoRepository.merge(puesto, updateNomPuestoDto);
    return this.puestoRepository.save(puesto);
  }

  async remove(id: number) {
    const puesto = await this.findOne(id);
    await this.puestoRepository.remove(puesto);
    return `Puesto con ID "${id}" eliminado exitosamente.`;
  }
}
