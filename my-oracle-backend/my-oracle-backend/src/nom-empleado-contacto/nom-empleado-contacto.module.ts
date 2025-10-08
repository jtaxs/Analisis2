import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomEmpleadoContactoService } from './nom-empleado-contacto.service';
import { NomEmpleadoContactoController } from './nom-empleado-contacto.controller';
import { NomEmpleadoContacto } from './entities/nom-empleado-contacto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomEmpleadoContacto])],
  controllers: [NomEmpleadoContactoController],
  providers: [NomEmpleadoContactoService],
})
export class NomEmpleadoContactoModule {}
