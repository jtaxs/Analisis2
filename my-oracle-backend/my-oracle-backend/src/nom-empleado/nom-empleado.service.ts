import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomEmpleado } from './entities/nom-empleado.entity';
import { CreateNomEmpleadoDto } from './dto/create-nom-empleado.dto';
import { UpdateNomEmpleadoDto } from './dto/update-nom-empleado.dto';

@Injectable()
export class NomEmpleadoService {
  constructor(
    @InjectRepository(NomEmpleado)
    private empleadoRepository: Repository<NomEmpleado>,
  ) {}

  async create(createNomEmpleadoDto: CreateNomEmpleadoDto) {
    const empleado = this.empleadoRepository.create(createNomEmpleadoDto);
    return this.empleadoRepository.save(empleado);
  }

  findAll() {
    return this.empleadoRepository.find();
  }

  async findOne(id: number) {
    const empleado = await this.empleadoRepository.findOneBy({ empEmpleadoId: id });
    if (!empleado) {
      throw new NotFoundException(`Empleado con ID "${id}" no encontrado.`);
    }
    return empleado;
  }

  async update(id: number, updateNomEmpleadoDto: UpdateNomEmpleadoDto) {
    const empleado = await this.findOne(id);
    this.empleadoRepository.merge(empleado, updateNomEmpleadoDto);
    return this.empleadoRepository.save(empleado);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
    return `Empleado con ID "${id}" eliminado exitosamente.`;
  }
}
