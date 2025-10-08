import { Test, TestingModule } from '@nestjs/testing';
import { NomPeriodoNominaService } from './nom-periodo-nomina.service';

describe('NomPeriodoNominaService', () => {
  let service: NomPeriodoNominaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomPeriodoNominaService],
    }).compile();

    service = module.get<NomPeriodoNominaService>(NomPeriodoNominaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
