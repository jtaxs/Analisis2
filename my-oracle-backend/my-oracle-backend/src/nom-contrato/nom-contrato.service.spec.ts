import { Test, TestingModule } from '@nestjs/testing';
import { NomContratoService } from './nom-contrato.service';

describe('NomContratoService', () => {
  let service: NomContratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomContratoService],
    }).compile();

    service = module.get<NomContratoService>(NomContratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
