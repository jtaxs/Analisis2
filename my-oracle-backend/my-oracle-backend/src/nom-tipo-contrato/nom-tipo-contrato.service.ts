import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomTipoContrato } from './entities/nom-tipo-contrato.entity';
import { CreateNomTipoContratoDto } from './dto/create-nom-tipo-contrato.dto';
import { UpdateNomTipoContratoDto } from './dto/update-nom-tipo-contrato.dto';

@Injectable()
export class NomTipoContratoService {
  constructor(
    @InjectRepository(NomTipoContrato)
    private tipoContratoRepository: Repository<NomTipoContrato>,
  ) {}

  async create(createNomTipoContratoDto: CreateNomTipoContratoDto) {
    const tipoContrato = this.tipoContratoRepository.create(createNomTipoContratoDto);
    return this.tipoContratoRepository.save(tipoContrato);
  }

  findAll() {
    return this.tipoContratoRepository.find();
  }

  async findOne(id: number) {
    const tipoContrato = await this.tipoContratoRepository.findOneBy({ tcoTipoContratoId: id });
    if (!tipoContrato) {
      throw new NotFoundException(`Tipo de contrato con ID "${id}" no encontrado.`);
    }
    return tipoContrato;
  }

  async update(id: number, updateNomTipoContratoDto: UpdateNomTipoContratoDto) {
    const tipoContrato = await this.findOne(id);
    this.tipoContratoRepository.merge(tipoContrato, updateNomTipoContratoDto);
    return this.tipoContratoRepository.save(tipoContrato);
  }

  async remove(id: number) {
    const tipoContrato = await this.findOne(id);
    await this.tipoContratoRepository.remove(tipoContrato);
    return `Tipo de contrato con ID "${id}" eliminado exitosamente.`;
  }
}
