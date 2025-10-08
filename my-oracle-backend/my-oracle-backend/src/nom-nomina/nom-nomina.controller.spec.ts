import { Test, TestingModule } from '@nestjs/testing';
import { NomNominaController } from './nom-nomina.controller';
import { NomNominaService } from './nom-nomina.service';

describe('NomNominaController', () => {
  let controller: NomNominaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomNominaController],
      providers: [NomNominaService],
    }).compile();

    controller = module.get<NomNominaController>(NomNominaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
