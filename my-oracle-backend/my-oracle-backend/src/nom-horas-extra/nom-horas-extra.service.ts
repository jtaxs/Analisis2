import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomHorasExtra } from './entities/nom-horas-extra.entity';
import { CreateNomHorasExtraDto } from './dto/create-nom-horas-extra.dto';
import { UpdateNomHorasExtraDto } from './dto/update-nom-horas-extra.dto';

@Injectable()
export class NomHorasExtraService {
  constructor(
    @InjectRepository(NomHorasExtra)
    private horasExtraRepository: Repository<NomHorasExtra>,
  ) {}

  async create(createNomHorasExtraDto: CreateNomHorasExtraDto) {
    const horasExtra = this.horasExtraRepository.create(createNomHorasExtraDto);
    return this.horasExtraRepository.save(horasExtra);
  }

  findAll() {
    return this.horasExtraRepository.find();
  }

  async findOne(id: number) {
    const horasExtra = await this.horasExtraRepository.findOneBy({ hexHoraExtraId: id });
    if (!horasExtra) {
      throw new NotFoundException(`Registro de horas extra con ID "${id}" no encontrado.`);
    }
    return horasExtra;
  }

  async update(id: number, updateNomHorasExtraDto: UpdateNomHorasExtraDto) {
    const horasExtra = await this.findOne(id);
    this.horasExtraRepository.merge(horasExtra, updateNomHorasExtraDto);
    return this.horasExtraRepository.save(horasExtra);
  }

  async remove(id: number) {
    const horasExtra = await this.findOne(id);
    await this.horasExtraRepository.remove(horasExtra);
    return `Registro de horas extra con ID "${id}" eliminado exitosamente.`;
  }
}
