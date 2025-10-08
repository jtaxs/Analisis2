import { Test, TestingModule } from '@nestjs/testing';
import { NomHorasExtraController } from './nom-horas-extra.controller';
import { NomHorasExtraService } from './nom-horas-extra.service';

describe('NomHorasExtraController', () => {
  let controller: NomHorasExtraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomHorasExtraController],
      providers: [NomHorasExtraService],
    }).compile();

    controller = module.get<NomHorasExtraController>(NomHorasExtraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
