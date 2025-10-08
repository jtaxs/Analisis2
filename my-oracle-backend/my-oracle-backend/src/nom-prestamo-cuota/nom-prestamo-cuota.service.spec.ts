import { Test, TestingModule } from '@nestjs/testing';
import { NomPrestamoCuotaService } from './nom-prestamo-cuota.service';

describe('NomPrestamoCuotaService', () => {
  let service: NomPrestamoCuotaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomPrestamoCuotaService],
    }).compile();

    service = module.get<NomPrestamoCuotaService>(NomPrestamoCuotaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
