import { Test, TestingModule } from '@nestjs/testing';
import { NomEmpleadoCuentaController } from './nom-empleado-cuenta.controller';
import { NomEmpleadoCuentaService } from './nom-empleado-cuenta.service';

describe('NomEmpleadoCuentaController', () => {
  let controller: NomEmpleadoCuentaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomEmpleadoCuentaController],
      providers: [NomEmpleadoCuentaService],
    }).compile();

    controller = module.get<NomEmpleadoCuentaController>(NomEmpleadoCuentaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
