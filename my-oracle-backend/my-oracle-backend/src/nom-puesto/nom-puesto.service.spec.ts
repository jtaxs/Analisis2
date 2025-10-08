import { Test, TestingModule } from '@nestjs/testing';
import { NomPuestoService } from './nom-puesto.service';

describe('NomPuestoService', () => {
  let service: NomPuestoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomPuestoService],
    }).compile();

    service = module.get<NomPuestoService>(NomPuestoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
