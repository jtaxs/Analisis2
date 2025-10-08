import { Test, TestingModule } from '@nestjs/testing';
import { NomNominaDetalleService } from './nom-nomina-detalle.service';

describe('NomNominaDetalleService', () => {
  let service: NomNominaDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomNominaDetalleService],
    }).compile();

    service = module.get<NomNominaDetalleService>(NomNominaDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
