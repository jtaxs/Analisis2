import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomPrestamoService } from './nom-prestamo.service';
import { NomPrestamoController } from './nom-prestamo.controller';
import { NomPrestamo } from './entities/nom-prestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomPrestamo])],
  controllers: [NomPrestamoController],
  providers: [NomPrestamoService],
})
export class NomPrestamoModule {}
