import { Test, TestingModule } from '@nestjs/testing';
import { NomBancoController } from './nom-banco.controller';
import { NomBancoService } from './nom-banco.service';

describe('NomBancoController', () => {
  let controller: NomBancoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomBancoController],
      providers: [NomBancoService],
    }).compile();

    controller = module.get<NomBancoController>(NomBancoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
