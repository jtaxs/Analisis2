import { Test, TestingModule } from '@nestjs/testing';
import { NomBancoService } from './nom-banco.service';

describe('NomBancoService', () => {
  let service: NomBancoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomBancoService],
    }).compile();

    service = module.get<NomBancoService>(NomBancoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
