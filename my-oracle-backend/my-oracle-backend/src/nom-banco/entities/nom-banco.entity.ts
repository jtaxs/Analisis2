import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'NOM_BANCO' })
@Unique(['banCodigo'])
export class NomBanco {
  @PrimaryGeneratedColumn({ name: 'BAN_BANCO_ID' })
  banBancoId: number;

  @Column({ name: 'BAN_CODIGO', type: 'varchar2', length: 10 })
  banCodigo: string;

  @Column({ name: 'BAN_NOMBRE', type: 'varchar2', length: 120 })
  banNombre: string;
}
