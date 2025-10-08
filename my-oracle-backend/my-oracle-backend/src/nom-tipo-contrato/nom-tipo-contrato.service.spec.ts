import { Test, TestingModule } from '@nestjs/testing';
import { NomTipoContratoService } from './nom-tipo-contrato.service';

describe('NomTipoContratoService', () => {
  let service: NomTipoContratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomTipoContratoService],
    }).compile();

    service = module.get<NomTipoContratoService>(NomTipoContratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
