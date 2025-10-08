import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomPrestamo } from './entities/nom-prestamo.entity';
import { CreateNomPrestamoDto } from './dto/create-nom-prestamo.dto';
import { UpdateNomPrestamoDto } from './dto/update-nom-prestamo.dto';

@Injectable()
export class NomPrestamoService {
  constructor(
    @InjectRepository(NomPrestamo)
    private prestamoRepository: Repository<NomPrestamo>,
  ) {}

  async create(createNomPrestamoDto: CreateNomPrestamoDto) {
    const prestamo = this.prestamoRepository.create(createNomPrestamoDto);
    return this.prestamoRepository.save(prestamo);
  }

  findAll() {
    return this.prestamoRepository.find();
  }

  async findOne(id: number) {
    const prestamo = await this.prestamoRepository.findOneBy({ prePrestamoId: id });
    if (!prestamo) {
      throw new NotFoundException(`Préstamo con ID "${id}" no encontrado.`);
    }
    return prestamo;
  }

  async update(id: number, updateNomPrestamoDto: UpdateNomPrestamoDto) {
    const prestamo = await this.findOne(id);
    this.prestamoRepository.merge(prestamo, updateNomPrestamoDto);
    return this.prestamoRepository.save(prestamo);
  }

  async remove(id: number) {
    const prestamo = await this.findOne(id);
    await this.prestamoRepository.remove(prestamo);
    return `Préstamo con ID "${id}" eliminado exitosamente.`;
  }
}
