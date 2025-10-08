import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'NOM_JORNADA' })
@Unique(['jorCodigo'])
export class NomJornada {
  @PrimaryGeneratedColumn({ name: 'JOR_JORNADA_ID' })
  jorJornadaId: number;

  @Column({ name: 'JOR_CODIGO', type: 'varchar2', length: 20 })
  jorCodigo: string;

  @Column({ name: 'JOR_NOMBRE', type: 'varchar2', length: 100 })
  jorNombre: string;

  @Column({ name: 'JOR_HORAS_DIARIAS', type: 'float', default: 8 })
  jorHorasDiarias: number;
}
