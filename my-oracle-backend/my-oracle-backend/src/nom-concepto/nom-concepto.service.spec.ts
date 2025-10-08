import { Test, TestingModule } from '@nestjs/testing';
import { NomConceptoService } from './nom-concepto.service';

describe('NomConceptoService', () => {
  let service: NomConceptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomConceptoService],
    }).compile();

    service = module.get<NomConceptoService>(NomConceptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
