import { Test, TestingModule } from '@nestjs/testing';
import { NomSalarioHistService } from './nom-salario-hist.service';

describe('NomSalarioHistService', () => {
  let service: NomSalarioHistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomSalarioHistService],
    }).compile();

    service = module.get<NomSalarioHistService>(NomSalarioHistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
