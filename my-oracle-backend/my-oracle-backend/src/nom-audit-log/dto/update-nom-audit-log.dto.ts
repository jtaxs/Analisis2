import { PartialType } from '@nestjs/mapped-types';
import { CreateNomAuditLogDto } from './create-nom-audit-log.dto';

export class UpdateNomAuditLogDto extends PartialType(CreateNomAuditLogDto) {}
