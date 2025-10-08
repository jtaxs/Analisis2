import { Test, TestingModule } from '@nestjs/testing';
import { NomEmpleadoCuentaService } from './nom-empleado-cuenta.service';

describe('NomEmpleadoCuentaService', () => {
  let service: NomEmpleadoCuentaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomEmpleadoCuentaService],
    }).compile();

    service = module.get<NomEmpleadoCuentaService>(NomEmpleadoCuentaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
