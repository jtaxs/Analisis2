import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomAuditLogService } from './nom-audit-log.service';
import { NomAuditLogController } from './nom-audit-log.controller';
import { NomAuditLog } from './entities/nom-audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomAuditLog])],
  controllers: [NomAuditLogController],
  providers: [NomAuditLogService],
})
export class NomAuditLogModule {}
