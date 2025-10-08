import { Test, TestingModule } from '@nestjs/testing';
import { NomAusenciaService } from './nom-ausencia.service';

describe('NomAusenciaService', () => {
  let service: NomAusenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomAusenciaService],
    }).compile();

    service = module.get<NomAusenciaService>(NomAusenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
