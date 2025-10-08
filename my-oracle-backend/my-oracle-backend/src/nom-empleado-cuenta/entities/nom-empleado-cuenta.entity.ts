import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NomEmpleado } from '../../nom-empleado/entities/nom-empleado.entity';
import { NomBanco } from '../../nom-banco/entities/nom-banco.entity';

@Entity({ name: 'NOM_EMPLEADO_CUENTA' })
export class NomEmpleadoCuenta {
  @PrimaryGeneratedColumn({ name: 'EBC_CUENTA_ID' })
  ebcCuentaId: number;

  @Column({ name: 'EMP_EMPLEADO_ID' })
  empEmpleadoId: number;

  @Column({ name: 'BAN_BANCO_ID', nullable: true })
  banBancoId: number;

  @Column({ name: 'EBC_TIPO', type: 'varchar2', length: 20, default: 'AHORRO' })
  ebcTipo: string;

  @Column({ name: 'EBC_NUMERO', type: 'varchar2', length: 40, nullable: true })
  ebcNumero: string;

  @Column({ name: 'EBC_PORCENTAJE_PAGO', type: 'float', default: 100 })
  ebcPorcentajePago: number;

  @ManyToOne(() => NomEmpleado, (empleado) => empleado.cuentas)
  @JoinColumn({ name: 'EMP_EMPLEADO_ID' })
  empleado: NomEmpleado;

  @ManyToOne(() => NomBanco)
  @JoinColumn({ name: 'BAN_BANCO_ID' })
  banco: NomBanco;
}
