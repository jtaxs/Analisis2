import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomAusenciaService } from './nom-ausencia.service';
import { NomAusenciaController } from './nom-ausencia.controller';
import { NomAusencia } from './entities/nom-ausencia.entity';
import { NomContrato } from '../nom-contrato/entities/nom-contrato.entity'; // Asegúrate que la ruta sea correcta

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NomAusencia, 
      NomContrato // <-- Esta es la línea que resuelve el error
    ])
  ],
  controllers: [NomAusenciaController],
  providers: [NomAusenciaService],
})
export class NomAusenciaModule {}