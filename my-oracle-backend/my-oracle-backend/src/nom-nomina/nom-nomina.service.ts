import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomNomina } from './entities/nom-nomina.entity';
import { CreateNomNominaDto } from './dto/create-nom-nomina.dto';
import { UpdateNomNominaDto } from './dto/update-nom-nomina.dto';

@Injectable()
export class NomNominaService {
  constructor(
    @InjectRepository(NomNomina)
    private nominaRepository: Repository<NomNomina>,
  ) {}

  async create(createNomNominaDto: CreateNomNominaDto) {
    const nomina = this.nominaRepository.create(createNomNominaDto);
    return this.nominaRepository.save(nomina);
  }

  findAll() {
    return this.nominaRepository.find();
  }

  async findOne(id: number) {
    const nomina = await this.nominaRepository.findOneBy({ nomNominaId: id });
    if (!nomina) {
      throw new NotFoundException(`Nómina con ID "${id}" no encontrada.`);
    }
    return nomina;
  }

  async update(id: number, updateNomNominaDto: UpdateNomNominaDto) {
    const nomina = await this.findOne(id);
    this.nominaRepository.merge(nomina, updateNomNominaDto);
    return this.nominaRepository.save(nomina);
  }

  async remove(id: number) {
    const nomina = await this.findOne(id);
    await this.nominaRepository.remove(nomina);
    return `Nómina con ID "${id}" eliminada exitosamente.`;
  }
}
