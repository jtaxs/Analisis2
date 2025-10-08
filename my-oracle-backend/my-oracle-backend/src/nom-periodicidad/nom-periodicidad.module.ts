// src/nom-periodicidad/nom-periodicidad.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomPeriodicidadService } from './nom-periodicidad.service';
import { NomPeriodicidadController } from './nom-periodicidad.controller';
import { NomPeriodicidad } from './entities/nom-periodicidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NomPeriodicidad]), // <--- Corrección aquí
  ],
  controllers: [NomPeriodicidadController],
  providers: [NomPeriodicidadService],
})
export class NomPeriodicidadModule {}
