import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { NomAusencia } from './entities/nom-ausencia.entity';
import { CreateNomAusenciaDto } from './dto/create-nom-ausencia.dto';
import { UpdateNomAusenciaDto } from './dto/update-nom-ausencia.dto';
import { NomContrato } from '../nom-contrato/entities/nom-contrato.entity';

@Injectable()
export class NomAusenciaService {
  constructor(
    @InjectRepository(NomAusencia)
    private ausenciaRepository: Repository<NomAusencia>,
    @InjectRepository(NomContrato)
    private contratoRepository: Repository<NomContrato>,
  ) {}

  private getDaysBetween(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  // --- Métodos CRUD (Modificados y Originales) ---

  // Procedimiento 8: Registrar Ausencia (con validación de traslape)
  async create(createNomAusenciaDto: CreateNomAusenciaDto): Promise<NomAusencia> {
    const { conContratoId, ausFechaInicio, ausFechaFin } = createNomAusenciaDto;

    const tieneTraslape = await this.verificarTraslape(
      conContratoId,
      new Date(ausFechaInicio),
      new Date(ausFechaFin),
    );
    if (tieneTraslape) {
      throw new ConflictException(`Ya existe una ausencia registrada que se traslapa con las fechas proporcionadas.`);
    }

    const ausencia = this.ausenciaRepository.create({
      ...createNomAusenciaDto,
      ausFechaInicio: new Date(ausFechaInicio),
      ausFechaFin: new Date(ausFechaFin),
    });
    return this.ausenciaRepository.save(ausencia);
  }

  findAll(): Promise<NomAusencia[]> {
    return this.ausenciaRepository.find({ relations: ['contrato'] });
  }

  // Procedimiento 6: Generar Constancia de Ausencia
  async getConstancia(id: number): Promise<NomAusencia> {
    const ausencia = await this.ausenciaRepository.findOne({
      where: { ausAusenciaId: id },
      relations: ['contrato'],
    });
    if (!ausencia) {
      throw new NotFoundException(`Registro de ausencia con ID "${id}" no encontrado.`);
    }
    return ausencia;
  }

  // ✅ NUEVO: Alias para usar desde el controlador como `findOne`
  async findOne(id: number): Promise<NomAusencia> {
    return this.getConstancia(id);
  }

  async update(id: number, updateNomAusenciaDto: UpdateNomAusenciaDto): Promise<NomAusencia> {
    const ausencia = await this.getConstancia(id);
    this.ausenciaRepository.merge(ausencia, updateNomAusenciaDto);
    return this.ausenciaRepository.save(ausencia);
  }

  async remove(id: number): Promise<{ message: string }> {
    const ausencia = await this.getConstancia(id);
    await this.ausenciaRepository.remove(ausencia);
    return { message: `Registro de ausencia con ID "${id}" eliminado exitosamente.` };
  }

  // --- Implementación de Procedimientos ---

  async getResumenPorContrato(contratoId: number) {
    const ausencias = await this.ausenciaRepository.findBy({ conContratoId: contratoId });
    const resumen = ausencias.reduce((acc, curr) => {
      const dias = this.getDaysBetween(curr.ausFechaInicio, curr.ausFechaFin);
      if (!acc[curr.ausTipo]) {
        acc[curr.ausTipo] = { cantidadRegistros: 0, totalDias: 0 };
      }
      acc[curr.ausTipo].cantidadRegistros += 1;
      acc[curr.ausTipo].totalDias += dias;
      return acc;
    }, {});
    return resumen;
  }

  async getResumenMensual(anio: number, mes: number): Promise<NomAusencia[]> {
    const primerDia = new Date(anio, mes - 1, 1);
    const ultimoDia = new Date(anio, mes, 0);
    return this.ausenciaRepository.find({
      where: {
        ausFechaInicio: LessThanOrEqual(ultimoDia),
        ausFechaFin: MoreThanOrEqual(primerDia),
      },
      relations: ['contrato'],
    });
  }

  async getAlertaInjustificadas(limite: number, tipo: string = 'INJUSTIFICADA') {
    return this.ausenciaRepository
      .createQueryBuilder('ausencia')
      .select('ausencia.conContratoId', 'contratoId')
      .addSelect('COUNT(ausencia.ausAusenciaId)', 'cantidadInjustificada')
      .where('LOWER(ausencia.ausTipo) = LOWER(:tipo)', { tipo })
      .groupBy('ausencia.conContratoId')
      .having('COUNT(ausencia.ausAusenciaId) > :limite', { limite })
      .getRawMany();
  }

  async calcularDescuento(contratoId: number, anio: number, mes: number) {
    const contrato = await this.contratoRepository.findOneBy({ conContratoId: contratoId });
    if (!contrato) throw new NotFoundException(`Contrato con ID ${contratoId} no encontrado`);

    const primerDia = new Date(anio, mes - 1, 1);
    const ultimoDia = new Date(anio, mes, 0);

    const ausencias = await this.ausenciaRepository.find({
      where: {
        conContratoId: contratoId,
        ausRemunerada: 'N',
        ausFechaInicio: LessThanOrEqual(ultimoDia),
        ausFechaFin: MoreThanOrEqual(primerDia),
      },
    });

    const salarioDiario = contrato.conSalarioBase / 30;
    let diasADescontar = 0;
    ausencias.forEach((a) => {
      diasADescontar += this.getDaysBetween(a.ausFechaInicio, a.ausFechaFin);
    });

    return {
      contratoId,
      salarioBase: contrato.conSalarioBase,
      salarioDiario: parseFloat(salarioDiario.toFixed(2)),
      diasADescontar,
      montoTotalDescuento: parseFloat((salarioDiario * diasADescontar).toFixed(2)),
    };
  }

  async verificarTraslape(contratoId: number, fechaInicio: Date, fechaFin: Date): Promise<boolean> {
    const count = await this.ausenciaRepository.count({
      where: {
        conContratoId: contratoId,
        ausFechaInicio: LessThanOrEqual(fechaFin),
        ausFechaFin: MoreThanOrEqual(fechaInicio),
      },
    });
    return count > 0;
  }

  async getAusenciasProlongadas(dias: number): Promise<NomAusencia[]> {
    const ausencias = await this.ausenciaRepository.find({ relations: ['contrato'] });
    return ausencias.filter((a) => this.getDaysBetween(a.ausFechaInicio, a.ausFechaFin) > dias);
  }

  async removePorContrato(contratoId: number): Promise<{ message: string }> {
    const resultado = await this.ausenciaRepository.delete({ conContratoId: contratoId });
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontraron ausencias para el contrato ID ${contratoId}.`);
    }
    return { message: `${resultado.affected} registros de ausencia eliminados para el contrato ID ${contratoId}.` };
  }

  async getTotalDiasAusentesPorRango(contratoId: number, fechaInicio: Date, fechaFin: Date) {
    const ausencias = await this.ausenciaRepository.find({
      where: {
        conContratoId: contratoId,
        ausFechaInicio: LessThanOrEqual(fechaFin),
        ausFechaFin: MoreThanOrEqual(fechaInicio),
      },
    });
    let totalDias = 0;
    ausencias.forEach((a) => (totalDias += this.getDaysBetween(a.ausFechaInicio, a.ausFechaFin)));
    return { contratoId, fechaInicio, fechaFin, totalDias };
  }
}
