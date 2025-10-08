import { Test, TestingModule } from '@nestjs/testing';
import { NomIsrTablaController } from './nom-isr-tabla.controller';
import { NomIsrTablaService } from './nom-isr-tabla.service';

describe('NomIsrTablaController', () => {
  let controller: NomIsrTablaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomIsrTablaController],
      providers: [NomIsrTablaService],
    }).compile();

    controller = module.get<NomIsrTablaController>(NomIsrTablaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
