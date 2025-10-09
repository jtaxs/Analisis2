import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomHorasExtraService } from './nom-horas-extra.service';
import { NomHorasExtraController } from './nom-horas-extra.controller';

// 1. Importa la entidad que faltaba
import { NomHorasExtra } from './entities/nom-horas-extra.entity';
import { NomContrato } from '../nom-contrato/entities/nom-contrato.entity'; // <-- Asegúrate de que esta ruta sea correcta

@Module({
  imports: [
    // 2. Registra ambas entidades en el array
    TypeOrmModule.forFeature([
      NomHorasExtra, 
      NomContrato // <-- Añade NomContrato aquí
    ])
  ],
  controllers: [NomHorasExtraController],
  providers: [NomHorasExtraService],
})
export class NomHorasExtraModule {}