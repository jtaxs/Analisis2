import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomVacacionService } from './nom-vacacion.service';
import { NomVacacionController } from './nom-vacacion.controller';
import { NomVacacion } from './entities/nom-vacacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomVacacion])],
  controllers: [NomVacacionController],
  providers: [NomVacacionService],
})
export class NomVacacionModule {}
