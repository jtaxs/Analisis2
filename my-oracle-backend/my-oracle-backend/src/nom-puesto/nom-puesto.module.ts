// src/nom-puesto/nom-puesto.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomPuestoService } from './nom-puesto.service';
import { NomPuestoController } from './nom-puesto.controller';
import { NomPuesto } from './entities/nom-puesto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NomPuesto]), // <--- Add this line
  ],
  controllers: [NomPuestoController],
  providers: [NomPuestoService],
})
export class NomPuestoModule {}
