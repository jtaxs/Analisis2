// nom-horas-extra.service.ts
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

  async create(createNomHorasExtraDto: CreateNomHorasExtraDto): Promise<NomHorasExtra> {
    const horasExtra = this.horasExtraRepository.create(createNomHorasExtraDto);
    return this.horasExtraRepository.save(horasExtra);
  }

  findAll(): Promise<NomHorasExtra[]> {
    return this.horasExtraRepository.find();
  }

  async findOne(id: number): Promise<NomHorasExtra> {
    const horasExtra = await this.horasExtraRepository.findOneBy({ hexHoraExtraId: id });
    if (!horasExtra) {
      throw new NotFoundException(`Registro de horas extra con ID "${id}" no encontrado.`);
    }
    return horasExtra;
  }

  async update(id: number, updateNomHorasExtraDto: UpdateNomHorasExtraDto): Promise<NomHorasExtra> {
    const horasExtra = await this.findOne(id);
    this.horasExtraRepository.merge(horasExtra, updateNomHorasExtraDto);
    return this.horasExtraRepository.save(horasExtra);
  }

  async remove(id: number): Promise<string> {
    const horasExtra = await this.findOne(id);
    await this.horasExtraRepository.remove(horasExtra);
    return `Registro de horas extra con ID "${id}" eliminado exitosamente.`;
  }

  /**
   * Calcula el monto a pagar por un registro específico de horas extra.
   * @param id El ID del registro de horas extra.
   * @returns un objeto con el detalle del cálculo.
   */
  async calcularMonto(id: number): Promise<any> {
    // 1. Buscamos el registro de horas extra pidiendo que se incluya la relación 'contrato'
    const horasExtra = await this.horasExtraRepository.findOne({
      where: { hexHoraExtraId: id },
      relations: ['contrato'], // ¡Importante! Carga la entidad NomContrato relacionada
    });

    if (!horasExtra) {
      throw new NotFoundException(`Registro de horas extra con ID "${id}" no encontrado.`);
    }

    if (!horasExtra.contrato) {
      throw new NotFoundException(`No se encontró un contrato asociado al registro de horas extra ID "${id}".`);
    }

    // Lógica de cálculo: puede ajustarse a las reglas de negocio específicas.
    // Este es un ejemplo común para Guatemala (salario / 30 días / jornada diaria de 8 horas).
    const salarioBase = horasExtra.contrato.conSalarioBase;
    const salarioPorHora = salarioBase / 30 / 8;

    // 2. Realizamos la multiplicación final
    const montoCalculado = salarioPorHora * horasExtra.hexHoras * horasExtra.hexFactor;

    // 3. Devolvemos un resultado claro y estructurado
    return {
      idRegistro: horasExtra.hexHoraExtraId,
      fecha: horasExtra.hexFecha,
      salarioBaseContrato: salarioBase,
      salarioPorHoraCalculado: parseFloat(salarioPorHora.toFixed(4)),
      horasRegistradas: horasExtra.hexHoras,
      factorAplicado: horasExtra.hexFactor,
      montoAPagar: parseFloat(montoCalculado.toFixed(2)),
    };
  }
}