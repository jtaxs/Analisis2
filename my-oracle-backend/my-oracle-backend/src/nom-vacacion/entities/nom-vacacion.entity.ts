import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';

@Entity({ name: 'NOM_VACACION' })
export class NomVacacion {
  @PrimaryGeneratedColumn({ name: 'VAC_VACACION_ID' })
  vacVacacionId: number;

  @Column({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'VAC_FECHA_INICIO', type: 'date' })
  vacFechaInicio: Date;

  @Column({ name: 'VAC_FECHA_FIN', type: 'date' })
  vacFechaFin: Date;

  @Column({ name: 'VAC_DIAS', type: 'number', precision: 5, scale: 2 })
  vacDias: number;

  @Column({ name: 'VAC_PAGADAS', type: 'char', length: 1, default: 'S' })
  vacPagadas: string;

  @Column({ name: 'VAC_OBSERVACIONES', type: 'varchar2', length: 400, nullable: true })
  vacObservaciones: string;

  @ManyToOne(() => NomContrato)
  @JoinColumn({ name: 'CON_CONTRATO_ID' })
  contrato: NomContrato;
}
