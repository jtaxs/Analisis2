import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NomAuditLog } from './entities/nom-audit-log.entity';
import { CreateNomAuditLogDto } from './dto/create-nom-audit-log.dto';
import { UpdateNomAuditLogDto } from './dto/update-nom-audit-log.dto';

@Injectable()
export class NomAuditLogService {
  constructor(
    @InjectRepository(NomAuditLog)
    private auditLogRepository: Repository<NomAuditLog>,
  ) {}

  async create(createNomAuditLogDto: CreateNomAuditLogDto) {
    const auditLog = this.auditLogRepository.create(createNomAuditLogDto);
    return this.auditLogRepository.save(auditLog);
  }

  findAll() {
    return this.auditLogRepository.find();
  }

  async findOne(id: number) {
    const auditLog = await this.auditLogRepository.findOneBy({ audLogId: id });
    if (!auditLog) {
      throw new NotFoundException(`Registro de auditoría con ID "${id}" no encontrado.`);
    }
    return auditLog;
  }

  async update(id: number, updateNomAuditLogDto: UpdateNomAuditLogDto) {
    const auditLog = await this.findOne(id);
    this.auditLogRepository.merge(auditLog, updateNomAuditLogDto);
    return this.auditLogRepository.save(auditLog);
  }

  async remove(id: number) {
    const auditLog = await this.findOne(id);
    await this.auditLogRepository.remove(auditLog);
    return `Registro de auditoría con ID "${id}" eliminado exitosamente.`;
  }
}
