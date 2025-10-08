import { Test, TestingModule } from '@nestjs/testing';
import { NomLiquidacionController } from './nom-liquidacion.controller';
import { NomLiquidacionService } from './nom-liquidacion.service';

describe('NomLiquidacionController', () => {
  let controller: NomLiquidacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomLiquidacionController],
      providers: [NomLiquidacionService],
    }).compile();

    controller = module.get<NomLiquidacionController>(NomLiquidacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
