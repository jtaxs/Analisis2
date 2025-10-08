import { Test, TestingModule } from '@nestjs/testing';
import { NomPrestamoController } from './nom-prestamo.controller';
import { NomPrestamoService } from './nom-prestamo.service';

describe('NomPrestamoController', () => {
  let controller: NomPrestamoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomPrestamoController],
      providers: [NomPrestamoService],
    }).compile();

    controller = module.get<NomPrestamoController>(NomPrestamoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
