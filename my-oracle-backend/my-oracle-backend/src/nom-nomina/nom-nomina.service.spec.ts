import { Test, TestingModule } from '@nestjs/testing';
import { NomNominaService } from './nom-nomina.service';

describe('NomNominaService', () => {
  let service: NomNominaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomNominaService],
    }).compile();

    service = module.get<NomNominaService>(NomNominaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
