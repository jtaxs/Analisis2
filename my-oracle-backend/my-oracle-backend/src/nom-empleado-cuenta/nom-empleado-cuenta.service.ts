import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomEmpleadoCuenta } from './entities/nom-empleado-cuenta.entity';
import { CreateNomEmpleadoCuentaDto } from './dto/create-nom-empleado-cuenta.dto';
import { UpdateNomEmpleadoCuentaDto } from './dto/update-nom-empleado-cuenta.dto';

@Injectable()
export class NomEmpleadoCuentaService {
  constructor(
    @InjectRepository(NomEmpleadoCuenta)
    private cuentaRepository: Repository<NomEmpleadoCuenta>,
  ) {}

  async create(createNomEmpleadoCuentaDto: CreateNomEmpleadoCuentaDto) {
    const cuenta = this.cuentaRepository.create(createNomEmpleadoCuentaDto);
    return this.cuentaRepository.save(cuenta);
  }

  findAll() {
    return this.cuentaRepository.find();
  }

  async findOne(id: number) {
    const cuenta = await this.cuentaRepository.findOneBy({ ebcCuentaId: id });
    if (!cuenta) {
      throw new NotFoundException(`Cuenta con ID "${id}" no encontrada.`);
    }
    return cuenta;
  }

  async update(id: number, updateNomEmpleadoCuentaDto: UpdateNomEmpleadoCuentaDto) {
    const cuenta = await this.findOne(id);
    this.cuentaRepository.merge(cuenta, updateNomEmpleadoCuentaDto);
    return this.cuentaRepository.save(cuenta);
  }

  async remove(id: number) {
    const cuenta = await this.findOne(id);
    await this.cuentaRepository.remove(cuenta);
    return `Cuenta con ID "${id}" eliminada exitosamente.`;
  }
}
