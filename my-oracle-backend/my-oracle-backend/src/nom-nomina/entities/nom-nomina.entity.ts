import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { NomPeriodoNomina } from '../../nom-periodo-nomina/entities/nom-periodo-nomina.entity';
import { NomNominaDetalle } from '../../nom-nomina-detalle/entities/nom-nomina-detalle.entity';

@Entity({ name: 'NOM_NOMINA' })
export class NomNomina {
  @PrimaryGeneratedColumn({ name: 'NOM_NOMINA_ID' })
  nomNominaId: number;

  @Column({ name: 'PNO_PERIODO_ID' })
  pnoPeriodoId: number;

  @Column({ name: 'NOM_FECHA_CALCULO', type: 'date' })
  nomFechaCalculo: Date;

  @Column({ name: 'NOM_DESCRIPCION', type: 'varchar2', length: 200, nullable: true })
  nomDescripcion: string;

  @Column({ name: 'NOM_ESTADO', type: 'varchar2', length: 20, default: 'GENERADA' })
  nomEstado: string;

  @ManyToOne(() => NomPeriodoNomina, (periodoNomina) => periodoNomina.nominas)
  @JoinColumn({ name: 'PNO_PERIODO_ID' })
  periodoNomina: NomPeriodoNomina;

  @OneToMany(() => NomNominaDetalle, (detalle) => detalle.nomina)
  detalles: NomNominaDetalle[];
}
