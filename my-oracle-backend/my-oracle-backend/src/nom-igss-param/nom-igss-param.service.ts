import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomIgssParam } from './entities/nom-igss-param.entity';
import { CreateNomIgssParamDto } from './dto/create-nom-igss-param.dto';
import { UpdateNomIgssParamDto } from './dto/update-nom-igss-param.dto';

@Injectable()
export class NomIgssParamService {
  constructor(
    @InjectRepository(NomIgssParam)
    private igssParamRepository: Repository<NomIgssParam>,
  ) {}

  async create(createNomIgssParamDto: CreateNomIgssParamDto) {
    const igssParam = this.igssParamRepository.create(createNomIgssParamDto);
    return this.igssParamRepository.save(igssParam);
  }

  findAll() {
    return this.igssParamRepository.find();
  }

  async findOne(id: number) {
    const igssParam = await this.igssParamRepository.findOneBy({ igsParamId: id });
    if (!igssParam) {
      throw new NotFoundException(`Parámetro IGSS con ID "${id}" no encontrado.`);
    }
    return igssParam;
  }

  async update(id: number, updateNomIgssParamDto: UpdateNomIgssParamDto) {
    const igssParam = await this.findOne(id);
    this.igssParamRepository.merge(igssParam, updateNomIgssParamDto);
    return this.igssParamRepository.save(igssParam);
  }

  async remove(id: number) {
    const igssParam = await this.findOne(id);
    await this.igssParamRepository.remove(igssParam);
    return `Parámetro IGSS con ID "${id}" eliminado exitosamente.`;
  }
}
