import { Test, TestingModule } from '@nestjs/testing';
import { NomAuditLogService } from './nom-audit-log.service';

describe('NomAuditLogService', () => {
  let service: NomAuditLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomAuditLogService],
    }).compile();

    service = module.get<NomAuditLogService>(NomAuditLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
