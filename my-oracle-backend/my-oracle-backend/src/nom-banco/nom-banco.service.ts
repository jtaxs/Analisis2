import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomBanco } from './entities/nom-banco.entity';
import { CreateNomBancoDto } from './dto/create-nom-banco.dto';
import { UpdateNomBancoDto } from './dto/update-nom-banco.dto';

@Injectable()
export class NomBancoService {
  constructor(
    @InjectRepository(NomBanco)
    private bancoRepository: Repository<NomBanco>,
  ) {}

  async create(createNomBancoDto: CreateNomBancoDto) {
    const banco = this.bancoRepository.create(createNomBancoDto);
    return this.bancoRepository.save(banco);
  }

  findAll() {
    return this.bancoRepository.find();
  }

  async findOne(id: number) {
    const banco = await this.bancoRepository.findOneBy({ banBancoId: id });
    if (!banco) {
      throw new NotFoundException(`Banco con ID "${id}" no encontrado.`);
    }
    return banco;
  }

  async update(id: number, updateNomBancoDto: UpdateNomBancoDto) {
    const banco = await this.findOne(id);
    this.bancoRepository.merge(banco, updateNomBancoDto);
    return this.bancoRepository.save(banco);
  }

  async remove(id: number) {
    const banco = await this.findOne(id);
    await this.bancoRepository.remove(banco);
    return `Banco con ID "${id}" eliminado exitosamente.`;
  }
}
