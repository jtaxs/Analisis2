import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'NOM_CONCEPTO' })
@Unique(['cncCodigo'])
export class NomConcepto {
  @PrimaryGeneratedColumn({ name: 'CNC_CONCEPTO_ID' })
  cncConceptoId: number;

  @Column({ name: 'CNC_CODIGO', type: 'varchar2', length: 20 })
  cncCodigo: string;

  @Column({ name: 'CNC_NOMBRE', type: 'varchar2', length: 120 })
  cncNombre: string;

  @Column({ name: 'CNC_TIPO', type: 'varchar2', length: 20 })
  cncTipo: string;

  @Column({ name: 'CNC_GRAVA_IGSS', type: 'char', length: 1, default: 'S' })
  cncGravaIgss: string;

  @Column({ name: 'CNC_GRAVA_ISR', type: 'char', length: 1, default: 'S' })
  cncGravaIsr: string;

  @Column({ name: 'CNC_ES_HORAS_EXTRA', type: 'char', length: 1, default: 'N' })
  cncEsHorasExtra: string;

  @Column({ name: 'CNC_ES_AUSENCIA', type: 'char', length: 1, default: 'N' })
  cncEsAusencia: string;

  @Column({ name: 'CNC_ES_VACACION', type: 'char', length: 1, default: 'N' })
  cncEsVacacion: string;

  @Column({ name: 'CNC_FORMULA', type: 'varchar2', length: 4000, nullable: true })
  cncFormula: string;

  @Column({ name: 'CNC_ACTIVO', type: 'char', length: 1, default: 'S' })
  cncActivo: string;
}
