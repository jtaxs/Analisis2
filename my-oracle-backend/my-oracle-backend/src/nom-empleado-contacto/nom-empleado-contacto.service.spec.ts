import { Test, TestingModule } from '@nestjs/testing';
import { NomEmpleadoContactoService } from './nom-empleado-contacto.service';

describe('NomEmpleadoContactoService', () => {
  let service: NomEmpleadoContactoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomEmpleadoContactoService],
    }).compile();

    service = module.get<NomEmpleadoContactoService>(NomEmpleadoContactoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
