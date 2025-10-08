import { Test, TestingModule } from '@nestjs/testing';
import { NomJornadaController } from './nom-jornada.controller';
import { NomJornadaService } from './nom-jornada.service';

describe('NomJornadaController', () => {
  let controller: NomJornadaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomJornadaController],
      providers: [NomJornadaService],
    }).compile();

    controller = module.get<NomJornadaController>(NomJornadaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
