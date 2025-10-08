import { Test, TestingModule } from '@nestjs/testing';
import { NomPrestamoService } from './nom-prestamo.service';

describe('NomPrestamoService', () => {
  let service: NomPrestamoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomPrestamoService],
    }).compile();

    service = module.get<NomPrestamoService>(NomPrestamoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
