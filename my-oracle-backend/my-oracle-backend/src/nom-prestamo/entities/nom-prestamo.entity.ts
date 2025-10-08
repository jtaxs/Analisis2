import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';
import { NomPrestamoCuota } from '../../nom-prestamo-cuota/entities/nom-prestamo-cuota.entity';

@Entity({ name: 'NOM_PRESTAMO' })
export class NomPrestamo {
  @PrimaryGeneratedColumn({ name: 'PRE_PRESTAMO_ID' })
  prePrestamoId: number;

  @Column({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'PRE_FECHA', type: 'date' })
  preFecha: Date;

  @Column({ name: 'PRE_MONTO', type: 'number', precision: 12, scale: 2 })
  preMonto: number;

  @Column({ name: 'PRE_TASA_ANUAL', type: 'number', precision: 7, scale: 4, default: 0 })
  preTasaAnual: number;

  @Column({ name: 'PRE_PLAZO_MESES', type: 'number', precision: 4 })
  prePlazoMeses: number;

  @Column({ name: 'PRE_ESTADO', type: 'varchar2', length: 20, default: 'ACTIVO' })
  preEstado: string;

  @Column({ name: 'PRE_OBSERVACIONES', type: 'varchar2', length: 400, nullable: true })
  preObservaciones: string;

  @ManyToOne(() => NomContrato)
  @JoinColumn({ name: 'CON_CONTRATO_ID' })
  contrato: NomContrato;

  @OneToMany(() => NomPrestamoCuota, (cuota) => cuota.prestamo)
  cuotas: NomPrestamoCuota[];
}
