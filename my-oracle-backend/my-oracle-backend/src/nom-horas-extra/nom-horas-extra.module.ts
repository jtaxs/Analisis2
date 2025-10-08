import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomHorasExtraService } from './nom-horas-extra.service';
import { NomHorasExtraController } from './nom-horas-extra.controller';
import { NomHorasExtra } from './entities/nom-horas-extra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomHorasExtra])],
  controllers: [NomHorasExtraController],
  providers: [NomHorasExtraService],
})
export class NomHorasExtraModule {}
