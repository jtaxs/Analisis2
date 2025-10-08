import { Test, TestingModule } from '@nestjs/testing';
import { NomNominaDetalleController } from './nom-nomina-detalle.controller';
import { NomNominaDetalleService } from './nom-nomina-detalle.service';

describe('NomNominaDetalleController', () => {
  let controller: NomNominaDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomNominaDetalleController],
      providers: [NomNominaDetalleService],
    }).compile();

    controller = module.get<NomNominaDetalleController>(NomNominaDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
