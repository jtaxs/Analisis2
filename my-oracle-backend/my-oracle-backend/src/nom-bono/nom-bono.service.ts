import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomBono } from './entities/nom-bono.entity';
import { CreateNomBonoDto } from './dto/create-nom-bono.dto';
import { UpdateNomBonoDto } from './dto/update-nom-bono.dto';

@Injectable()
export class NomBonoService {
  constructor(
    @InjectRepository(NomBono)
    private bonoRepository: Repository<NomBono>,
  ) {}

  async create(createNomBonoDto: CreateNomBonoDto) {
    const bono = this.bonoRepository.create(createNomBonoDto);
    return this.bonoRepository.save(bono);
  }

  findAll() {
    return this.bonoRepository.find();
  }

  async findOne(id: number) {
    const bono = await this.bonoRepository.findOneBy({ bonBonoId: id });
    if (!bono) {
      throw new NotFoundException(`Bono con ID "${id}" no encontrado.`);
    }
    return bono;
  }

  async update(id: number, updateNomBonoDto: UpdateNomBonoDto) {
    const bono = await this.findOne(id);
    this.bonoRepository.merge(bono, updateNomBonoDto);
    return this.bonoRepository.save(bono);
  }

  async remove(id: number) {
    const bono = await this.findOne(id);
    await this.bonoRepository.remove(bono);
    return `Bono con ID "${id}" eliminado exitosamente.`;
  }
}
