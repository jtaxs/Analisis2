import { Test, TestingModule } from '@nestjs/testing';
import { NomIsrTablaService } from './nom-isr-tabla.service';

describe('NomIsrTablaService', () => {
  let service: NomIsrTablaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomIsrTablaService],
    }).compile();

    service = module.get<NomIsrTablaService>(NomIsrTablaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
