import { Entity, PrimaryGeneratedColumn, Column, Unique, Check } from 'typeorm';

@Entity({ name: 'NOM_TIPO_CONTRATO' })
@Unique(['tcoCodigo'])
export class NomTipoContrato {
  @PrimaryGeneratedColumn({ name: 'TCO_TIPO_CONTRATO_ID' })
  tcoTipoContratoId: number;

  @Column({ name: 'TCO_CODIGO', type: 'varchar2', length: 20 })
  tcoCodigo: string;

  @Column({ name: 'TCO_NOMBRE', type: 'varchar2', length: 120 })
  tcoNombre: string;

  @Column({ name: 'TCO_ACTIVO', type: 'char', length: 1, default: 'S' })
  @Check(`"TCO_ACTIVO" IN ('S', 'N')`)
  tcoActivo: string;
}
