import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomLiquidacionService } from './nom-liquidacion.service';
import { NomLiquidacionController } from './nom-liquidacion.controller';
import { NomLiquidacion } from './entities/nom-liquidacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomLiquidacion])],
  controllers: [NomLiquidacionController],
  providers: [NomLiquidacionService],
})
export class NomLiquidacionModule {}
