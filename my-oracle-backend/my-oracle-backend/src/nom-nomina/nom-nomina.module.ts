import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomNominaService } from './nom-nomina.service';
import { NomNominaController } from './nom-nomina.controller';
import { NomNomina } from './entities/nom-nomina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomNomina])],
  controllers: [NomNominaController],
  providers: [NomNominaService],
})
export class NomNominaModule {}
