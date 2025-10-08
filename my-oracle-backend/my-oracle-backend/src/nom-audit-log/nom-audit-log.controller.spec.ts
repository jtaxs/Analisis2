import { Test, TestingModule } from '@nestjs/testing';
import { NomAuditLogController } from './nom-audit-log.controller';
import { NomAuditLogService } from './nom-audit-log.service';

describe('NomAuditLogController', () => {
  let controller: NomAuditLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomAuditLogController],
      providers: [NomAuditLogService],
    }).compile();

    controller = module.get<NomAuditLogController>(NomAuditLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
