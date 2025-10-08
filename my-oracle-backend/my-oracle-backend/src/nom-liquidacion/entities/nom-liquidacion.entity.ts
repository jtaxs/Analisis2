import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';

@Entity({ name: 'NOM_LIQUIDACION' })
export class NomLiquidacion {
  @PrimaryGeneratedColumn({ name: 'LIQ_LIQ_ID' })
  liqLiqId: number;

  @Column({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'LIQ_FECHA', type: 'date' })
  liqFecha: Date;

  @Column({ name: 'LIQ_MOTIVO', type: 'varchar2', length: 60 })
  liqMotivo: string;

  @Column({ name: 'LIQ_VACACIONES', type: 'number', precision: 12, scale: 2, default: 0 })
  liqVacaciones: number;

  @Column({ name: 'LIQ_INDEMNIZACION', type: 'number', precision: 12, scale: 2, default: 0 })
  liqIndemnizacion: number;

  @Column({ name: 'LIQ_BONOS_PENDIENTES', type: 'number', precision: 12, scale: 2, default: 0 })
  liqBonosPendientes: number;

  @Column({ name: 'LIQ_OTROS', type: 'number', precision: 12, scale: 2, default: 0 })
  liqOtros: number;

  @Column({ name: 'LIQ_DEDUCCIONES', type: 'number', precision: 12, scale: 2, default: 0 })
  liqDeducciones: number;

  @Column({ name: 'LIQ_TOTAL', type: 'number', precision: 12, scale: 2 })
  liqTotal: number;

  @Column({ name: 'LIQ_DETALLE', type: 'varchar2', length: 4000, nullable: true })
  liqDetalle: string;

  @ManyToOne(() => NomContrato)
  @JoinColumn({ name: 'CON_CONTRATO_ID' })
  contrato: NomContrato;
}
