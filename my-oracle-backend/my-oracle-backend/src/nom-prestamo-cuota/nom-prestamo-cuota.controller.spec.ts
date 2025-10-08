import { Test, TestingModule } from '@nestjs/testing';
import { NomPrestamoCuotaController } from './nom-prestamo-cuota.controller';
import { NomPrestamoCuotaService } from './nom-prestamo-cuota.service';

describe('NomPrestamoCuotaController', () => {
  let controller: NomPrestamoCuotaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomPrestamoCuotaController],
      providers: [NomPrestamoCuotaService],
    }).compile();

    controller = module.get<NomPrestamoCuotaController>(NomPrestamoCuotaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
