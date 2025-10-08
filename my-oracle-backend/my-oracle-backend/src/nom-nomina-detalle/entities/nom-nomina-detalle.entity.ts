import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NomNomina } from '../../nom-nomina/entities/nom-nomina.entity';
import { NomContrato } from '../../nom-contrato/entities/nom-contrato.entity';
import { NomConcepto } from '../../nom-concepto/entities/nom-concepto.entity';

@Entity({ name: 'NOM_NOMINA_DETALLE' })
export class NomNominaDetalle {
  @PrimaryGeneratedColumn({ name: 'NOD_DETALLE_ID' })
  nodDetalleId: number;

  @Column({ name: 'NOM_NOMINA_ID' })
  nomNominaId: number;

  @Column({ name: 'CON_CONTRATO_ID' })
  conContratoId: number;

  @Column({ name: 'CNC_CONCEPTO_ID' })
  cncConceptoId: number;

  @Column({ name: 'NOD_CANTIDAD', type: 'number', precision: 10, scale: 2, default: 1 })
  nodCantidad: number;

  @Column({ name: 'NOD_MONTO_UNITARIO', type: 'number', precision: 12, scale: 2, default: 0 })
  nodMontoUnitario: number;

  @Column({ name: 'NOD_MONTO_TOTAL', type: 'number', precision: 12, scale: 2 })
  nodMontoTotal: number;

  @Column({ name: 'NOD_ES_GRAVADO_IGSS', type: 'char', length: 1, default: 'S' })
  nodEsGravadoIgss: string;

  @Column({ name: 'NOD_ES_GRAVADO_ISR', type: 'char', length: 1, default: 'S' })
  nodEsGravadoIsr: string;

  @ManyToOne(() => NomNomina, (nomina) => nomina.detalles)
  @JoinColumn({ name: 'NOM_NOMINA_ID' })
  nomina: NomNomina;

  @ManyToOne(() => NomContrato)
  @JoinColumn({ name: 'CON_CONTRATO_ID' })
  contrato: NomContrato;

  @ManyToOne(() => NomConcepto)
  @JoinColumn({ name: 'CNC_CONCEPTO_ID' })
  concepto: NomConcepto;
}
