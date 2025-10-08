import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomAusenciaService } from './nom-ausencia.service';
import { NomAusenciaController } from './nom-ausencia.controller';
import { NomAusencia } from './entities/nom-ausencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomAusencia])],
  controllers: [NomAusenciaController],
  providers: [NomAusenciaService],
})
export class NomAusenciaModule {}
