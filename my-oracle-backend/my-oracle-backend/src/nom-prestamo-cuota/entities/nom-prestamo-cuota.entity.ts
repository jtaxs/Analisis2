import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { NomPrestamo } from '../../nom-prestamo/entities/nom-prestamo.entity';

@Entity({ name: 'NOM_PRESTAMO_CUOTA' })
@Unique(['prePrestamoId', 'prcNumero'])
export class NomPrestamoCuota {
  @PrimaryGeneratedColumn({ name: 'PRC_CUOTA_ID' })
  prcCuotaId: number;

  @Column({ name: 'PRE_PRESTAMO_ID' })
  prePrestamoId: number;

  @Column({ name: 'PRC_NUMERO', type: 'number', precision: 4 })
  prcNumero: number;

  @Column({ name: 'PRC_FECHA_PACTADA', type: 'date' })
  prcFechaPactada: Date;

  @Column({ name: 'PRC_MONTO_CAPITAL', type: 'number', precision: 12, scale: 2, default: 0 })
  prcMontoCapital: number;

  @Column({ name: 'PRC_MONTO_INTERES', type: 'number', precision: 12, scale: 2, default: 0 })
  prcMontoInteres: number;

  @Column({ name: 'PRC_MONTO_TOTAL', type: 'number', precision: 12, scale: 2 })
  prcMontoTotal: number;

  @Column({ name: 'PRC_PAGADA', type: 'char', length: 1, default: 'N' })
  prcPagada: string;

  @Column({ name: 'PRC_FECHA_PAGO', type: 'date', nullable: true })
  prcFechaPago: Date;

  @ManyToOne(() => NomPrestamo, (prestamo) => prestamo.cuotas)
  @JoinColumn({ name: 'PRE_PRESTAMO_ID' })
  prestamo: NomPrestamo;
}
