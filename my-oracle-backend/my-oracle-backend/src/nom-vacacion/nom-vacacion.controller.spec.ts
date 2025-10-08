import { Test, TestingModule } from '@nestjs/testing';
import { NomVacacionController } from './nom-vacacion.controller';
import { NomVacacionService } from './nom-vacacion.service';

describe('NomVacacionController', () => {
  let controller: NomVacacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomVacacionController],
      providers: [NomVacacionService],
    }).compile();

    controller = module.get<NomVacacionController>(NomVacacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
