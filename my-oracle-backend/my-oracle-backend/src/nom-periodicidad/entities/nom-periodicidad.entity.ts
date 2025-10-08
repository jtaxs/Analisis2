import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'NOM_PERIODICIDAD' })
@Unique(['perCodigo'])
export class NomPeriodicidad {
  @PrimaryGeneratedColumn({ name: 'PER_PERIODICIDAD_ID' })
  perPeriodicidadId: number;

  @Column({ name: 'PER_CODIGO', type: 'varchar2', length: 20 })
  perCodigo: string;

  @Column({ name: 'PER_NOMBRE', type: 'varchar2', length: 60 })
  perNombre: string;

  @Column({ name: 'PER_DIAS_PROMEDIO', type: 'float' })
  perDiasPromedio: number;
}
