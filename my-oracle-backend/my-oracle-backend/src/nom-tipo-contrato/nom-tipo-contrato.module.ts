// src/nom-tipo-contrato/nom-tipo-contrato.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomTipoContratoService } from './nom-tipo-contrato.service';
import { NomTipoContratoController } from './nom-tipo-contrato.controller';
import { NomTipoContrato } from './entities/nom-tipo-contrato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NomTipoContrato]), // <--- Corrección aquí
  ],
  controllers: [NomTipoContratoController],
  providers: [NomTipoContratoService],
})
export class NomTipoContratoModule {}
