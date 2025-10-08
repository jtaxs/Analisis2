import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomConcepto } from './entities/nom-concepto.entity';
import { CreateNomConceptoDto } from './dto/create-nom-concepto.dto';
import { UpdateNomConceptoDto } from './dto/update-nom-concepto.dto';

@Injectable()
export class NomConceptoService {
  constructor(
    @InjectRepository(NomConcepto)
    private conceptoRepository: Repository<NomConcepto>,
  ) {}

  async create(createNomConceptoDto: CreateNomConceptoDto) {
    const concepto = this.conceptoRepository.create(createNomConceptoDto);
    return this.conceptoRepository.save(concepto);
  }

  findAll() {
    return this.conceptoRepository.find();
  }

  async findOne(id: number) {
    const concepto = await this.conceptoRepository.findOneBy({ cncConceptoId: id });
    if (!concepto) {
      throw new NotFoundException(`Concepto con ID "${id}" no encontrado.`);
    }
    return concepto;
  }

  async update(id: number, updateNomConceptoDto: UpdateNomConceptoDto) {
    const concepto = await this.findOne(id);
    this.conceptoRepository.merge(concepto, updateNomConceptoDto);
    return this.conceptoRepository.save(concepto);
  }

  async remove(id: number) {
    const concepto = await this.findOne(id);
    await this.conceptoRepository.remove(concepto);
    return `Concepto con ID "${id}" eliminado exitosamente.`;
  }
}
