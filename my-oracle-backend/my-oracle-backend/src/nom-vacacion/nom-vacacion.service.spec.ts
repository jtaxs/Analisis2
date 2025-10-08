import { Test, TestingModule } from '@nestjs/testing';
import { NomVacacionService } from './nom-vacacion.service';

describe('NomVacacionService', () => {
  let service: NomVacacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomVacacionService],
    }).compile();

    service = module.get<NomVacacionService>(NomVacacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
