import { Test, TestingModule } from '@nestjs/testing';
import { NomEmpleadoController } from './nom-empleado.controller';
import { NomEmpleadoService } from './nom-empleado.service';

describe('NomEmpleadoController', () => {
  let controller: NomEmpleadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomEmpleadoController],
      providers: [NomEmpleadoService],
    }).compile();

    controller = module.get<NomEmpleadoController>(NomEmpleadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
