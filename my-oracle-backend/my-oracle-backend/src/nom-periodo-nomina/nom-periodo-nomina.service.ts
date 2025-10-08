import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomPeriodoNomina } from './entities/nom-periodo-nomina.entity';
import { CreateNomPeriodoNominaDto } from './dto/create-nom-periodo-nomina.dto';
import { UpdateNomPeriodoNominaDto } from './dto/update-nom-periodo-nomina.dto';

@Injectable()
export class NomPeriodoNominaService {
  constructor(
    @InjectRepository(NomPeriodoNomina)
    private periodoNominaRepository: Repository<NomPeriodoNomina>,
  ) {}

  async create(createNomPeriodoNominaDto: CreateNomPeriodoNominaDto) {
    const periodoNomina = this.periodoNominaRepository.create(createNomPeriodoNominaDto);
    return this.periodoNominaRepository.save(periodoNomina);
  }

  findAll() {
    return this.periodoNominaRepository.find();
  }

  async findOne(id: number) {
    const periodoNomina = await this.periodoNominaRepository.findOneBy({ pnoPeriodoId: id });
    if (!periodoNomina) {
      throw new NotFoundException(`Período de nómina con ID "${id}" no encontrado.`);
    }
    return periodoNomina;
  }

  async update(id: number, updateNomPeriodoNominaDto: UpdateNomPeriodoNominaDto) {
    const periodoNomina = await this.findOne(id);
    this.periodoNominaRepository.merge(periodoNomina, updateNomPeriodoNominaDto);
    return this.periodoNominaRepository.save(periodoNomina);
  }

  async remove(id: number) {
    const periodoNomina = await this.findOne(id);
    await this.periodoNominaRepository.remove(periodoNomina);
    return `Período de nómina con ID "${id}" eliminado exitosamente.`;
  }
}
