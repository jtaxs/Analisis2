// src/nom-departamento/nom-departamento.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomDepartamentoService } from './nom-departamento.service';
import { NomDepartamentoController } from './nom-departamento.controller';
import { NomDepartamento } from './entities/nom-departamento.entity'; // Make sure this line exists

@Module({
  imports: [
    TypeOrmModule.forFeature([NomDepartamento]) // <--- ADD THIS LINE
  ],
  controllers: [NomDepartamentoController],
  providers: [NomDepartamentoService],
})
export class NomDepartamentoModule {}
