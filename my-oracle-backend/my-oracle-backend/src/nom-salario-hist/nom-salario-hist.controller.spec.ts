import { Test, TestingModule } from '@nestjs/testing';
import { NomSalarioHistController } from './nom-salario-hist.controller';
import { NomSalarioHistService } from './nom-salario-hist.service';

describe('NomSalarioHistController', () => {
  let controller: NomSalarioHistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomSalarioHistController],
      providers: [NomSalarioHistService],
    }).compile();

    controller = module.get<NomSalarioHistController>(NomSalarioHistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
