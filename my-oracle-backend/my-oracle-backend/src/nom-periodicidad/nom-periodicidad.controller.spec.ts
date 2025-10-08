import { Test, TestingModule } from '@nestjs/testing';
import { NomPeriodicidadController } from './nom-periodicidad.controller';
import { NomPeriodicidadService } from './nom-periodicidad.service';

describe('NomPeriodicidadController', () => {
  let controller: NomPeriodicidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomPeriodicidadController],
      providers: [NomPeriodicidadService],
    }).compile();

    controller = module.get<NomPeriodicidadController>(NomPeriodicidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
