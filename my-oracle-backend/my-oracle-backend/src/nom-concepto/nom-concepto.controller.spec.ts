import { Test, TestingModule } from '@nestjs/testing';
import { NomConceptoController } from './nom-concepto.controller';
import { NomConceptoService } from './nom-concepto.service';

describe('NomConceptoController', () => {
  let controller: NomConceptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomConceptoController],
      providers: [NomConceptoService],
    }).compile();

    controller = module.get<NomConceptoController>(NomConceptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
