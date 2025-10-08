import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomEmpleadoCuentaService } from './nom-empleado-cuenta.service';
import { NomEmpleadoCuentaController } from './nom-empleado-cuenta.controller';
import { NomEmpleadoCuenta } from './entities/nom-empleado-cuenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomEmpleadoCuenta])],
  controllers: [NomEmpleadoCuentaController],
  providers: [NomEmpleadoCuentaService],
})
export class NomEmpleadoCuentaModule {}
