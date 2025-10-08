import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NomEmpleado } from '../../nom-empleado/entities/nom-empleado.entity';

@Entity({ name: 'NOM_EMPLEADO_CONTACTO' })
export class NomEmpleadoContacto {
  @PrimaryGeneratedColumn({ name: 'ECO_CONTACTO_ID' })
  ecoContactoId: number;

  @Column({ name: 'EMP_EMPLEADO_ID' })
  empEmpleadoId: number;

  @Column({ name: 'ECO_TIPO', type: 'varchar2', length: 30 })
  ecoTipo: string;

  @Column({ name: 'ECO_NOMBRE', type: 'varchar2', length: 120 })
  ecoNombre: string;

  @Column({ name: 'ECO_PARENTESCO', type: 'varchar2', length: 60, nullable: true })
  ecoParentesco: string;

  @Column({ name: 'ECO_TELEFONO', type: 'varchar2', length: 30, nullable: true })
  ecoTelefono: string;

  @Column({ name: 'ECO_EMAIL', type: 'varchar2', length: 150, nullable: true })
  ecoEmail: string;

  @ManyToOne(() => NomEmpleado, (empleado) => empleado.contactos)
  @JoinColumn({ name: 'EMP_EMPLEADO_ID' })
  empleado: NomEmpleado;
}
