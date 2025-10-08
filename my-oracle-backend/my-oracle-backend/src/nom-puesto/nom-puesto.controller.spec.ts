import { Test, TestingModule } from '@nestjs/testing';
import { NomPuestoController } from './nom-puesto.controller';
import { NomPuestoService } from './nom-puesto.service';

describe('NomPuestoController', () => {
  let controller: NomPuestoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomPuestoController],
      providers: [NomPuestoService],
    }).compile();

    controller = module.get<NomPuestoController>(NomPuestoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
