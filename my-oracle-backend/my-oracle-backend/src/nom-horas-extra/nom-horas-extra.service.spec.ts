import { Test, TestingModule } from '@nestjs/testing';
import { NomHorasExtraService } from './nom-horas-extra.service';

describe('NomHorasExtraService', () => {
  let service: NomHorasExtraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomHorasExtraService],
    }).compile();

    service = module.get<NomHorasExtraService>(NomHorasExtraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
