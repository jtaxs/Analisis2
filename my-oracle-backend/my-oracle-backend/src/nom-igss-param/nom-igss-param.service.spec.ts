import { Test, TestingModule } from '@nestjs/testing';
import { NomIgssParamService } from './nom-igss-param.service';

describe('NomIgssParamService', () => {
  let service: NomIgssParamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomIgssParamService],
    }).compile();

    service = module.get<NomIgssParamService>(NomIgssParamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
