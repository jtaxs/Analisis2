import { Test, TestingModule } from '@nestjs/testing';
import { NomEmpleadoService } from './nom-empleado.service';

describe('NomEmpleadoService', () => {
  let service: NomEmpleadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomEmpleadoService],
    }).compile();

    service = module.get<NomEmpleadoService>(NomEmpleadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
