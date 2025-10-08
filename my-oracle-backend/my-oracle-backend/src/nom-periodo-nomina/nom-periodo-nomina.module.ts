import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomPeriodoNominaService } from './nom-periodo-nomina.service';
import { NomPeriodoNominaController } from './nom-periodo-nomina.controller';
import { NomPeriodoNomina } from './entities/nom-periodo-nomina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomPeriodoNomina])],
  controllers: [NomPeriodoNominaController],
  providers: [NomPeriodoNominaService],
})
export class NomPeriodoNominaModule {}
