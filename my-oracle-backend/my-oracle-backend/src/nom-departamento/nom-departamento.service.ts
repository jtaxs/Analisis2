import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomDepartamento } from './entities/nom-departamento.entity';
import { CreateNomDepartamentoDto } from './dto/create-nom-departamento.dto';
import { UpdateNomDepartamentoDto } from './dto/update-nom-departamento.dto';

@Injectable()
export class NomDepartamentoService {
  constructor(
    @InjectRepository(NomDepartamento)
    private departamentoRepository: Repository<NomDepartamento>,
  ) {}

  async create(createNomDepartamentoDto: CreateNomDepartamentoDto) {
    const departamento = this.departamentoRepository.create(createNomDepartamentoDto);
    return this.departamentoRepository.save(departamento);
  }

  findAll() {
    return this.departamentoRepository.find();
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRepository.findOneBy({ depDepartamentoId: id });
    if (!departamento) {
      throw new NotFoundException(`Departamento con ID "${id}" no encontrado.`);
    }
    return departamento;
  }

  async update(id: number, updateNomDepartamentoDto: UpdateNomDepartamentoDto) {
    const departamento = await this.findOne(id); // Reutilizamos el método findOne para verificar si existe
    this.departamentoRepository.merge(departamento, updateNomDepartamentoDto);
    return this.departamentoRepository.save(departamento);
  }

  async remove(id: number) {
    const departamento = await this.findOne(id); // Reutilizamos el método findOne para verificar si existe
    await this.departamentoRepository.remove(departamento);
    return `Departamento con ID "${id}" eliminado exitosamente.`;
  }
}
