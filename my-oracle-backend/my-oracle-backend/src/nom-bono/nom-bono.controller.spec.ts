import { Test, TestingModule } from '@nestjs/testing';
import { NomBonoController } from './nom-bono.controller';
import { NomBonoService } from './nom-bono.service';

describe('NomBonoController', () => {
  let controller: NomBonoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomBonoController],
      providers: [NomBonoService],
    }).compile();

    controller = module.get<NomBonoController>(NomBonoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
