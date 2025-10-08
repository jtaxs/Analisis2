import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomAusencia } from './entities/nom-ausencia.entity';
import { CreateNomAusenciaDto } from './dto/create-nom-ausencia.dto';
import { UpdateNomAusenciaDto } from './dto/update-nom-ausencia.dto';

@Injectable()
export class NomAusenciaService {
  constructor(
    @InjectRepository(NomAusencia)
    private ausenciaRepository: Repository<NomAusencia>,
  ) {}

  async create(createNomAusenciaDto: CreateNomAusenciaDto) {
    const ausencia = this.ausenciaRepository.create(createNomAusenciaDto);
    return this.ausenciaRepository.save(ausencia);
  }

  findAll() {
    return this.ausenciaRepository.find();
  }

  async findOne(id: number) {
    const ausencia = await this.ausenciaRepository.findOneBy({ ausAusenciaId: id });
    if (!ausencia) {
      throw new NotFoundException(`Registro de ausencia con ID "${id}" no encontrado.`);
    }
    return ausencia;
  }

  async update(id: number, updateNomAusenciaDto: UpdateNomAusenciaDto) {
    const ausencia = await this.findOne(id);
    this.ausenciaRepository.merge(ausencia, updateNomAusenciaDto);
    return this.ausenciaRepository.save(ausencia);
  }

  async remove(id: number) {
    const ausencia = await this.findOne(id);
    await this.ausenciaRepository.remove(ausencia);
    return `Registro de ausencia con ID "${id}" eliminado exitosamente.`;
  }
}
