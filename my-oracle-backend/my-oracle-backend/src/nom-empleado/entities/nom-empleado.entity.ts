import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { NomEmpleadoContacto } from '../../nom-empleado-contacto/entities/nom-empleado-contacto.entity';
import { NomEmpleadoCuenta } from '../../nom-empleado-cuenta/entities/nom-empleado-cuenta.entity';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';

@Entity({ name: 'NOM_EMPLEADO' })
@Unique(['empCodigoEmp', 'empDpi', 'empNit'])
export class NomEmpleado {
  @PrimaryGeneratedColumn({ name: 'EMP_EMPLEADO_ID' })
  empEmpleadoId: number;

  @Column({ name: 'EMP_CODIGO_EMP', type: 'varchar2', length: 30, unique: true })
  empCodigoEmp: string;

  @Column({ name: 'EMP_DPI', type: 'varchar2', length: 20, nullable: true })
  empDpi: string;

  @Column({ name: 'EMP_NIT', type: 'varchar2', length: 20, nullable: true })
  empNit: string;

  @Column({ name: 'EMP_NOMBRES', type: 'varchar2', length: 120 })
  empNombres: string;

  @Column({ name: 'EMP_APELLIDOS', type: 'varchar2', length: 120 })
  empApellidos: string;

  @Column({ name: 'EMP_FECHA_NAC', type: 'date', nullable: true })
  empFechaNac: Date;

  @Column({ name: 'EMP_SEXO', type: 'char', length: 1, nullable: true })
  empSexo: string;

  @Column({ name: 'EMP_EMAIL', type: 'varchar2', length: 150, nullable: true })
  empEmail: string;

  @Column({ name: 'EMP_TELEFONO', type: 'varchar2', length: 30, nullable: true })
  empTelefono: string;

  @Column({ name: 'EMP_DIRECCION', type: 'varchar2', length: 250, nullable: true })
  empDireccion: string;

  @Column({ name: 'EMP_ESTADO_CIVIL', type: 'varchar2', length: 20, nullable: true })
  empEstadoCivil: string;

  @Column({ name: 'EMP_DEPENDIENTES', type: 'float', default: 0 })
  empDependientes: number;

  @Column({ name: 'EMP_ACTIVO', type: 'char', length: 1, default: 'S' })
  empActivo: string;

  @OneToMany(() => NomEmpleadoContacto, (contacto) => contacto.empleado)
  contactos: NomEmpleadoContacto[];

  @OneToMany(() => NomEmpleadoCuenta, (cuenta) => cuenta.empleado)
  cuentas: NomEmpleadoCuenta[];

  @OneToMany(() => NomContrato, (contrato) => contrato.empleado)
  contratos: NomContrato[];
}
