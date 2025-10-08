import { Test, TestingModule } from '@nestjs/testing';
import { NomContratoController } from './nom-contrato.controller';
import { NomContratoService } from './nom-contrato.service';

describe('NomContratoController', () => {
  let controller: NomContratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomContratoController],
      providers: [NomContratoService],
    }).compile();

    controller = module.get<NomContratoController>(NomContratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
