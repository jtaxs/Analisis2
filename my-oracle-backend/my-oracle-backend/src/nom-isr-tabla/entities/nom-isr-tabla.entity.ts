import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'NOM_ISR_TABLA' })
@Unique(['isrAnio', 'isrTramoNum'])
export class NomIsrTabla {
  @PrimaryGeneratedColumn({ name: 'ISR_TABLA_ID' })
  isrTablaId: number;

  @Column({ name: 'ISR_ANIO', type: 'number', precision: 4, nullable: false })
  isrAnio: number;

  @Column({ name: 'ISR_TRAMO_NUM', type: 'number', precision: 2, nullable: false })
  isrTramoNum: number;

  @Column({ name: 'ISR_DESDE', type: 'number', precision: 12, scale: 2, nullable: false })
  isrDesde: number;

  @Column({ name: 'ISR_HASTA', type: 'number', precision: 12, scale: 2, nullable: true })
  isrHasta: number;

  @Column({ name: 'ISR_TASA', type: 'number', precision: 6, scale: 4, nullable: false })
  isrTasa: number;

  @Column({ name: 'ISR_CUOTA_FIJA', type: 'number', precision: 12, scale: 2, default: 0 })
  isrCuotaFija: number;
}
