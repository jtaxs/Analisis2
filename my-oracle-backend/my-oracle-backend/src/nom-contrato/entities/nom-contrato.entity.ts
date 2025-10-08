import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { NomEmpleado } from '../../nom-empleado/entities/nom-empleado.entity';
import { NomPuesto } from '../../nom-puesto/entities/nom-puesto.entity';
import { NomDepartamento } from '../../nom-departamento/entities/nom-departamento.entity';
import { NomTipoContrato } from '../../nom-tipo-contrato/entities/nom-tipo-contrato.entity';
import { NomPeriodicidad } from '../../nom-periodicidad/entities/nom-periodicidad.entity';
import { NomJornada } from '../../nom-jornada/entities/nom-jornada.entity';
import { NomSalarioHist } from '../../nom-salario-hist/entities/nom-salario-hist.entity';

@Entity({ name: 'NOM_CONTRATO' })
export class NomContrato {
  @PrimaryGeneratedColumn({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'EMP_EMPLEADO_ID' })
  empEmpleadoId: number;

  @Column({ name: 'PUE_PUESTO_ID' })
  puePuestoId: number;

  @Column({ name: 'DEP_DEPARTAMENTO_ID' })
  depDepartamentoId: number;

  @Column({ name: 'TCO_TIPO_CONTRATO_ID' })
  tcoTipoContratoId: number;

  @Column({ name: 'PER_PERIODICIDAD_ID' })
  perPeriodicidadId: number;

  @Column({ name: 'JOR_JORNADA_ID', nullable: true })
  jorJornadaId: number;

  @Column({ name: 'CON_FECHA_INICIO', type: 'date' })
  conFechaInicio: Date;

  @Column({ name: 'CON_FECHA_FIN', type: 'date', nullable: true })
  conFechaFin: Date;

  @Column({ name: 'CON_SALARIO_BASE', type: 'float' })
  conSalarioBase: number;

  @Column({ name: 'CON_FORMA_PAGO', type: 'varchar2', length: 20, default: 'TRANSFERENCIA' })
  conFormaPago: string;

  @Column({ name: 'CON_ESTADO', type: 'varchar2', length: 20, default: 'ACTIVO' })
  conEstado: string;

  @Column({ name: 'CON_SUBSIDIO', type: 'float', default: 0 })
  conSubsidio: number;

  @Column({ name: 'CON_OBSERVACIONES', type: 'varchar2', length: 4000, nullable: true })
  conObservaciones: string;

  @ManyToOne(() => NomEmpleado, (empleado) => empleado.contratos)
  @JoinColumn({ name: 'EMP_EMPLEADO_ID' })
  empleado: NomEmpleado;

  @ManyToOne(() => NomPuesto)
  @JoinColumn({ name: 'PUE_PUESTO_ID' })
  puesto: NomPuesto;

  @ManyToOne(() => NomDepartamento)
  @JoinColumn({ name: 'DEP_DEPARTAMENTO_ID' })
  departamento: NomDepartamento;

  @ManyToOne(() => NomTipoContrato)
  @JoinColumn({ name: 'TCO_TIPO_CONTRATO_ID' })
  tipoContrato: NomTipoContrato;

  @ManyToOne(() => NomPeriodicidad)
  @JoinColumn({ name: 'PER_PERIODICIDAD_ID' })
  periodicidad: NomPeriodicidad;

  @ManyToOne(() => NomJornada)
  @JoinColumn({ name: 'JOR_JORNADA_ID' })
  jornada: NomJornada;

  @OneToMany(() => NomSalarioHist, (salarioHist) => salarioHist.contrato)
  historialSalarios: NomSalarioHist[];
}
