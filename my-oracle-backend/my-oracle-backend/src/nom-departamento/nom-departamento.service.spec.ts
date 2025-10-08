import { Test, TestingModule } from '@nestjs/testing';
import { NomDepartamentoService } from './nom-departamento.service';

describe('NomDepartamentoService', () => {
  let service: NomDepartamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomDepartamentoService],
    }).compile();

    service = module.get<NomDepartamentoService>(NomDepartamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
