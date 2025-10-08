import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomEmpleadoContacto } from './entities/nom-empleado-contacto.entity';
import { CreateNomEmpleadoContactoDto } from './dto/create-nom-empleado-contacto.dto';
import { UpdateNomEmpleadoContactoDto } from './dto/update-nom-empleado-contacto.dto';

@Injectable()
export class NomEmpleadoContactoService {
  constructor(
    @InjectRepository(NomEmpleadoContacto)
    private contactoRepository: Repository<NomEmpleadoContacto>,
  ) {}

  async create(createNomEmpleadoContactoDto: CreateNomEmpleadoContactoDto) {
    const contacto = this.contactoRepository.create(createNomEmpleadoContactoDto);
    return this.contactoRepository.save(contacto);
  }

  findAll() {
    return this.contactoRepository.find();
  }

  async findOne(id: number) {
    const contacto = await this.contactoRepository.findOneBy({ ecoContactoId: id });
    if (!contacto) {
      throw new NotFoundException(`Contacto con ID "${id}" no encontrado.`);
    }
    return contacto;
  }

  async update(id: number, updateNomEmpleadoContactoDto: UpdateNomEmpleadoContactoDto) {
    const contacto = await this.findOne(id);
    this.contactoRepository.merge(contacto, updateNomEmpleadoContactoDto);
    return this.contactoRepository.save(contacto);
  }

  async remove(id: number) {
    const contacto = await this.findOne(id);
    await this.contactoRepository.remove(contacto);
    return `Contacto con ID "${id}" eliminado exitosamente.`;
  }
}
