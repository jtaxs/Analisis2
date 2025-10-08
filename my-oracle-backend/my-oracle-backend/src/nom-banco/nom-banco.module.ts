// src/nom-banco/nom-banco.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomBancoService } from './nom-banco.service';
import { NomBancoController } from './nom-banco.controller';
import { NomBanco } from './entities/nom-banco.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NomBanco]), // <--- Corrección aquí
  ],
  controllers: [NomBancoController],
  providers: [NomBancoService],
})
export class NomBancoModule {}
