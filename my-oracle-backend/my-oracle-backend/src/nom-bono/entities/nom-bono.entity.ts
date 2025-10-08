import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';

@Entity({ name: 'NOM_BONO' })
@Unique(['conContratoId', 'bonTipo', 'bonAnio'])
export class NomBono {
  @PrimaryGeneratedColumn({ name: 'BON_BONO_ID' })
  bonBonoId: number;

  @Column({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'BON_TIPO', type: 'varchar2', length: 30 })
  bonTipo: string;

  @Column({ name: 'BON_ANIO', type: 'number', precision: 4 })
  bonAnio: number;

  @Column({ name: 'BON_MONTO_CALCULADO', type: 'number', precision: 12, scale: 2 })
  bonMontoCalculado: number;

  @Column({ name: 'BON_MONTO_PAGADO', type: 'number', precision: 12, scale: 2, default: 0 })
  bonMontoPagado: number;

  @Column({ name: 'BON_FECHA_PAGO', type: 'date', nullable: true })
  bonFechaPago: Date;

  @Column({ name: 'BON_OBSERVACIONES', type: 'varchar2', length: 400, nullable: true })
  bonObservaciones: string;

  @ManyToOne(() => NomContrato)
  @JoinColumn({ name: 'CON_CONTRATO_ID' })
  contrato: NomContrato;
}
