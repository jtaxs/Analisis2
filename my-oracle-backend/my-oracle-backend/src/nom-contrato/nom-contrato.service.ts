import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomContrato } from './entities/nom-contrato.entity';
import { CreateNomContratoDto } from './dto/create-nom-contrato.dto';
import { UpdateNomContratoDto } from './dto/update-nom-contrato.dto';

@Injectable()
export class NomContratoService {
  constructor(
    @InjectRepository(NomContrato)
    private contratoRepository: Repository<NomContrato>,
  ) {}

  async create(createNomContratoDto: CreateNomContratoDto) {
    const contrato = this.contratoRepository.create(createNomContratoDto);
    return this.contratoRepository.save(contrato);
  }

  findAll() {
    return this.contratoRepository.find();
  }

  async findOne(id: number) {
    const contrato = await this.contratoRepository.findOneBy({ conContratoId: id });
    if (!contrato) {
      throw new NotFoundException(`Contrato con ID "${id}" no encontrado.`);
    }
    return contrato;
  }

  async update(id: number, updateNomContratoDto: UpdateNomContratoDto) {
    const contrato = await this.findOne(id);
    this.contratoRepository.merge(contrato, updateNomContratoDto);
    return this.contratoRepository.save(contrato);
  }

  async remove(id: number) {
    const contrato = await this.findOne(id);
    await this.contratoRepository.remove(contrato);
    return `Contrato con ID "${id}" eliminado exitosamente.`;
  }
}
