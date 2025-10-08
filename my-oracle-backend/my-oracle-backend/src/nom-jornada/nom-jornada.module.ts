// src/nom-jornada/nom-jornada.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomJornadaService } from './nom-jornada.service';
import { NomJornadaController } from './nom-jornada.controller';
import { NomJornada } from './entities/nom-jornada.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NomJornada]), // <--- Corrección aquí
  ],
  controllers: [NomJornadaController],
  providers: [NomJornadaService],
})
export class NomJornadaModule {}
