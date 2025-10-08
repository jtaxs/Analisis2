import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomNominaDetalleService } from './nom-nomina-detalle.service';
import { NomNominaDetalleController } from './nom-nomina-detalle.controller';
import { NomNominaDetalle } from './entities/nom-nomina-detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomNominaDetalle])],
  controllers: [NomNominaDetalleController],
  providers: [NomNominaDetalleService],
})
export class NomNominaDetalleModule {}
