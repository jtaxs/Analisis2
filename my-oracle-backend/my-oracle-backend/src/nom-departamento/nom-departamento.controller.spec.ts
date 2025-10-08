import { Test, TestingModule } from '@nestjs/testing';
import { NomDepartamentoController } from './nom-departamento.controller';
import { NomDepartamentoService } from './nom-departamento.service';

describe('NomDepartamentoController', () => {
  let controller: NomDepartamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomDepartamentoController],
      providers: [NomDepartamentoService],
    }).compile();

    controller = module.get<NomDepartamentoController>(NomDepartamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
