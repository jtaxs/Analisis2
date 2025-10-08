import { Test, TestingModule } from '@nestjs/testing';
import { NomAusenciaController } from './nom-ausencia.controller';
import { NomAusenciaService } from './nom-ausencia.service';

describe('NomAusenciaController', () => {
  let controller: NomAusenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomAusenciaController],
      providers: [NomAusenciaService],
    }).compile();

    controller = module.get<NomAusenciaController>(NomAusenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
