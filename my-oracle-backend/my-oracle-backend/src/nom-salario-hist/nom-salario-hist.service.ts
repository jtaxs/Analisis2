import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomSalarioHist } from './entities/nom-salario-hist.entity';
import { CreateNomSalarioHistDto } from './dto/create-nom-salario-hist.dto';
import { UpdateNomSalarioHistDto } from './dto/update-nom-salario-hist.dto';

@Injectable()
export class NomSalarioHistService {
  constructor(
    @InjectRepository(NomSalarioHist)
    private salarioHistRepository: Repository<NomSalarioHist>,
  ) {}

  async create(createNomSalarioHistDto: CreateNomSalarioHistDto) {
    const salarioHist = this.salarioHistRepository.create(createNomSalarioHistDto);
    return this.salarioHistRepository.save(salarioHist);
  }

  findAll() {
    return this.salarioHistRepository.find();
  }

  async findOne(id: number) {
    const salarioHist = await this.salarioHistRepository.findOneBy({ salHistId: id });
    if (!salarioHist) {
      throw new NotFoundException(`Historial de salario con ID "${id}" no encontrado.`);
    }
    return salarioHist;
  }

  async update(id: number, updateNomSalarioHistDto: UpdateNomSalarioHistDto) {
    const salarioHist = await this.findOne(id);
    this.salarioHistRepository.merge(salarioHist, updateNomSalarioHistDto);
    return this.salarioHistRepository.save(salarioHist);
  }

  async remove(id: number) {
    const salarioHist = await this.findOne(id);
    await this.salarioHistRepository.remove(salarioHist);
    return `Historial de salario con ID "${id}" eliminado exitosamente.`;
  }
}
