import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';

@Entity({ name: 'NOM_SALARIO_HIST' })
export class NomSalarioHist {
  @PrimaryGeneratedColumn({ name: 'SAL_HIST_ID' })
  salHistId: number;

  @Column({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'SAL_FECHA_EFECTIVA', type: 'date' })
  salFechaEfectiva: Date;

  @Column({ name: 'SAL_SALARIO_BASE', type: 'float' })
  salarioBase: number;

  @Column({ name: 'SAL_SUBSIDIO', type: 'float', default: 0 })
  salSubsidio: number;

  @Column({ name: 'SAL_MOTIVO', type: 'varchar2', length: 200, nullable: true })
  salMotivo: string;

  @ManyToOne(() => NomContrato, (contrato) => contrato.historialSalarios)
  @JoinColumn({ name: 'CON_CONTRATO_ID' })
  contrato: NomContrato;
}
