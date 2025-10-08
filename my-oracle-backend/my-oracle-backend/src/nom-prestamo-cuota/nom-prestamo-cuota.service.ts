import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomPrestamoCuota } from './entities/nom-prestamo-cuota.entity';
import { CreateNomPrestamoCuotaDto } from './dto/create-nom-prestamo-cuota.dto';
import { UpdateNomPrestamoCuotaDto } from './dto/update-nom-prestamo-cuota.dto';

@Injectable()
export class NomPrestamoCuotaService {
  constructor(
    @InjectRepository(NomPrestamoCuota)
    private prestamoCuotaRepository: Repository<NomPrestamoCuota>,
  ) {}

  async create(createNomPrestamoCuotaDto: CreateNomPrestamoCuotaDto) {
    const prestamoCuota = this.prestamoCuotaRepository.create(createNomPrestamoCuotaDto);
    return this.prestamoCuotaRepository.save(prestamoCuota);
  }

  findAll() {
    return this.prestamoCuotaRepository.find();
  }

  async findOne(id: number) {
    const prestamoCuota = await this.prestamoCuotaRepository.findOneBy({ prcCuotaId: id });
    if (!prestamoCuota) {
      throw new NotFoundException(`Cuota de préstamo con ID "${id}" no encontrada.`);
    }
    return prestamoCuota;
  }

  async update(id: number, updateNomPrestamoCuotaDto: UpdateNomPrestamoCuotaDto) {
    const prestamoCuota = await this.findOne(id);
    this.prestamoCuotaRepository.merge(prestamoCuota, updateNomPrestamoCuotaDto);
    return this.prestamoCuotaRepository.save(prestamoCuota);
  }

  async remove(id: number) {
    const prestamoCuota = await this.findOne(id);
    await this.prestamoCuotaRepository.remove(prestamoCuota);
    return `Cuota de préstamo con ID "${id}" eliminada exitosamente.`;
  }
}
