import { Test, TestingModule } from '@nestjs/testing';
import { NomLiquidacionService } from './nom-liquidacion.service';

describe('NomLiquidacionService', () => {
  let service: NomLiquidacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomLiquidacionService],
    }).compile();

    service = module.get<NomLiquidacionService>(NomLiquidacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
