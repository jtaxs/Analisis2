import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomBonoService } from './nom-bono.service';
import { NomBonoController } from './nom-bono.controller';
import { NomBono } from './entities/nom-bono.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomBono])],
  controllers: [NomBonoController],
  providers: [NomBonoService],
})
export class NomBonoModule {}
