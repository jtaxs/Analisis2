import { Test, TestingModule } from '@nestjs/testing';
import { NomTipoContratoController } from './nom-tipo-contrato.controller';
import { NomTipoContratoService } from './nom-tipo-contrato.service';

describe('NomTipoContratoController', () => {
  let controller: NomTipoContratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomTipoContratoController],
      providers: [NomTipoContratoService],
    }).compile();

    controller = module.get<NomTipoContratoController>(NomTipoContratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
