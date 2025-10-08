import { Test, TestingModule } from '@nestjs/testing';
import { NomBonoService } from './nom-bono.service';

describe('NomBonoService', () => {
  let service: NomBonoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomBonoService],
    }).compile();

    service = module.get<NomBonoService>(NomBonoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
