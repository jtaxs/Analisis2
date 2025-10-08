import { Test, TestingModule } from '@nestjs/testing';
import { NomIgssParamController } from './nom-igss-param.controller';
import { NomIgssParamService } from './nom-igss-param.service';

describe('NomIgssParamController', () => {
  let controller: NomIgssParamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomIgssParamController],
      providers: [NomIgssParamService],
    }).compile();

    controller = module.get<NomIgssParamController>(NomIgssParamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
