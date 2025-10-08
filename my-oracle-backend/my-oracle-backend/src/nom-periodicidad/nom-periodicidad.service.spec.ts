import { Test, TestingModule } from '@nestjs/testing';
import { NomPeriodicidadService } from './nom-periodicidad.service';

describe('NomPeriodicidadService', () => {
  let service: NomPeriodicidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomPeriodicidadService],
    }).compile();

    service = module.get<NomPeriodicidadService>(NomPeriodicidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
