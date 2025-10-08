import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { NomPeriodicidad } from '../../nom-periodicidad/entities/nom-periodicidad.entity';
import { NomNomina } from '../../nom-nomina/entities/nom-nomina.entity';

@Entity({ name: 'NOM_PERIODO_NOMINA' })
@Unique(['perPeriodicidadId', 'pnoAnio', 'pnoNumero'])
export class NomPeriodoNomina {
  @PrimaryGeneratedColumn({ name: 'PNO_PERIODO_ID' })
  pnoPeriodoId: number;

  @Column({ name: 'PER_PERIODICIDAD_ID' })
  perPeriodicidadId: number;

  @Column({ name: 'PNO_ANIO', type: 'number', precision: 4 })
  pnoAnio: number;

  @Column({ name: 'PNO_NUMERO', type: 'number', precision: 4 })
  pnoNumero: number;

  @Column({ name: 'PNO_FECHA_INICIO', type: 'date' })
  pnoFechaInicio: Date;

  @Column({ name: 'PNO_FECHA_FIN', type: 'date' })
  pnoFechaFin: Date;

  @Column({ name: 'PNO_ESTADO', type: 'varchar2', length: 20, default: 'ABIERTO' })
  pnoEstado: string;

  @ManyToOne(() => NomPeriodicidad)
  @JoinColumn({ name: 'PER_PERIODICIDAD_ID' })
  periodicidad: NomPeriodicidad;

  @OneToMany(() => NomNomina, (nomina) => nomina.periodoNomina)
  nominas: NomNomina[];
}
