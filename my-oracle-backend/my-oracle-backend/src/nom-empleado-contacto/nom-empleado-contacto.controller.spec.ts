import { Test, TestingModule } from '@nestjs/testing';
import { NomEmpleadoContactoController } from './nom-empleado-contacto.controller';
import { NomEmpleadoContactoService } from './nom-empleado-contacto.service';

describe('NomEmpleadoContactoController', () => {
  let controller: NomEmpleadoContactoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomEmpleadoContactoController],
      providers: [NomEmpleadoContactoService],
    }).compile();

    controller = module.get<NomEmpleadoContactoController>(NomEmpleadoContactoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
