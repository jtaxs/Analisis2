import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'NOM_IGSS_PARAM' })
@Unique(['igsAnio'])
export class NomIgssParam {
  @PrimaryGeneratedColumn({ name: 'IGS_PARAM_ID' })
  igsParamId: number;

  @Column({ name: 'IGS_ANIO', type: 'number', precision: 4, nullable: false })
  igsAnio: number;

  @Column({ name: 'IGS_TASA_PATRONAL', type: 'number', precision: 5, scale: 2, nullable: false })
  igsTasaPatronal: number;

  @Column({ name: 'IGS_TASA_LABORAL', type: 'number', precision: 5, scale: 2, nullable: false })
  igsTasaLaboral: number;

  @Column({ name: 'IGS_TOPE_BASE', type: 'number', precision: 12, scale: 2, nullable: true })
  igsTopeBase: number;
}
