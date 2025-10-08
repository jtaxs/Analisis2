import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'NOM_AUDIT_LOG' })
export class NomAuditLog {
  @PrimaryGeneratedColumn({ name: 'AUD_LOG_ID' })
  audLogId: number;

  @Column({ name: 'AUD_FECHA', type: 'date' })
  audFecha: Date;

  @Column({ name: 'AUD_USUARIO', type: 'varchar2', length: 120, nullable: true })
  audUsuario: string;

  @Column({ name: 'AUD_ACCION', type: 'varchar2', length: 30, nullable: true })
  audAccion: string;

  @Column({ name: 'AUD_TABLA', type: 'varchar2', length: 60, nullable: true })
  audTabla: string;

  @Column({ name: 'AUD_CLAVE', type: 'varchar2', length: 120, nullable: true })
  audClave: string;

  @Column({ name: 'AUD_DETALLE', type: 'varchar2', length: 4000, nullable: true })
  audDetalle: string;
}
