import { Entity, PrimaryGeneratedColumn, Column, Unique, Check } from 'typeorm';

@Entity({ name: 'NOM_PUESTO' })
@Unique(['pueCodigo'])
export class NomPuesto {
  @PrimaryGeneratedColumn({ name: 'PUE_PUESTO_ID' })
  puePuestoId: number;

  @Column({ name: 'PUE_CODIGO', type: 'varchar2', length: 20 })
  pueCodigo: string;

  @Column({ name: 'PUE_NOMBRE', type: 'varchar2', length: 120 })
  pueNombre: string;

  @Column({ name: 'PUE_ACTIVO', type: 'char', length: 1, default: 'S' })
  @Check(`"PUE_ACTIVO" IN ('S', 'N')`)
  pueActivo: string;
}
