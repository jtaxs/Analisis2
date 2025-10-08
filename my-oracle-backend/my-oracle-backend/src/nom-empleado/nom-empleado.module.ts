import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomEmpleadoService } from './nom-empleado.service';
import { NomEmpleadoController } from './nom-empleado.controller';
import { NomEmpleado } from './entities/nom-empleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomEmpleado])],
  controllers: [NomEmpleadoController],
  providers: [NomEmpleadoService],
})
export class NomEmpleadoModule {}
