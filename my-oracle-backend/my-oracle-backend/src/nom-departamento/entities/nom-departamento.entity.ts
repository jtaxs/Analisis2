import { Entity, PrimaryGeneratedColumn, Column, Check, Unique } from 'typeorm';

@Entity({ name: 'NOM_DEPARTAMENTO' })
@Unique(['depCodigo'])
export class NomDepartamento {
  @PrimaryGeneratedColumn({ name: 'DEP_DEPARTAMENTO_ID' })
  depDepartamentoId: number;

  @Column({ name: 'DEP_CODIGO', type: 'varchar2', length: 20 })
  depCodigo: string;

  @Column({ name: 'DEP_NOMBRE', type: 'varchar2', length: 120 })
  depNombre: string;

  @Column({ name: 'DEP_ACTIVO', type: 'char', length: 1, default: 'S' })
  @Check(`"DEP_ACTIVO" IN ('S', 'N')`)
  depActivo: string;
}
