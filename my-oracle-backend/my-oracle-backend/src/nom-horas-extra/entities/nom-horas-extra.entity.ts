import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';

@Entity({ name: 'NOM_HORAS_EXTRA' })
export class NomHorasExtra {
  @PrimaryGeneratedColumn({ name: 'HEX_HORA_EXTRA_ID' })
  hexHoraExtraId: number;

  @Column({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'HEX_FECHA', type: 'date' })
  hexFecha: Date;

  @Column({ name: 'HEX_TIPO', type: 'varchar2', length: 20 })
  hexTipo: string;

  @Column({ name: 'HEX_HORAS', type: 'number', precision: 6, scale: 2 })
  hexHoras: number;

  @Column({ name: 'HEX_FACTOR', type: 'number', precision: 6, scale: 3, default: 1.5 })
  hexFactor: number;

  @Column({ name: 'HEX_AUTORIZADO_POR', type: 'varchar2', length: 120, nullable: true })
  hexAutorizadoPor: string;

  @Column({ name: 'HEX_OBSERVACIONES', type: 'varchar2', length: 400, nullable: true })
  hexObservaciones: string;

  @ManyToOne(() => NomContrato)
  @JoinColumn({ name: 'CON_CONTRATO_ID' })
  contrato: NomContrato;
}
