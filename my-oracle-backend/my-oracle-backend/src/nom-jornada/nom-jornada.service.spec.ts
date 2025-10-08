import { Test, TestingModule } from '@nestjs/testing';
import { NomJornadaService } from './nom-jornada.service';

describe('NomJornadaService', () => {
  let service: NomJornadaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomJornadaService],
    }).compile();

    service = module.get<NomJornadaService>(NomJornadaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
