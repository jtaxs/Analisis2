import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';

@Entity({ name: 'NOM_AUSENCIA' })
export class NomAusencia {
  @PrimaryGeneratedColumn({ name: 'AUS_AUSENCIA_ID' })
  ausAusenciaId: number;

  @Column({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'AUS_FECHA_INICIO', type: 'date' })
  ausFechaInicio: Date;

  @Column({ name: 'AUS_FECHA_FIN', type: 'date' })
  ausFechaFin: Date;

  @Column({ name: 'AUS_TIPO', type: 'varchar2', length: 30 })
  ausTipo: string;

  @Column({ name: 'AUS_REMUNERADA', type: 'char', length: 1, default: 'N' })
  ausRemunerada: string;

  @Column({ name: 'AUS_OBSERVACIONES', type: 'varchar2', length: 400, nullable: true })
  ausObservaciones: string;

  @ManyToOne(() => NomContrato)
  @JoinColumn({ name: 'CON_CONTRATO_ID' })
  contrato: NomContrato;
}
