import { Test, TestingModule } from '@nestjs/testing';
import { NomPeriodoNominaController } from './nom-periodo-nomina.controller';
import { NomPeriodoNominaService } from './nom-periodo-nomina.service';

describe('NomPeriodoNominaController', () => {
  let controller: NomPeriodoNominaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomPeriodoNominaController],
      providers: [NomPeriodoNominaService],
    }).compile();

    controller = module.get<NomPeriodoNominaController>(NomPeriodoNominaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
