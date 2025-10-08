import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomContratoService } from './nom-contrato.service';
import { NomContratoController } from './nom-contrato.controller';
import { NomContrato } from './entities/nom-contrato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomContrato])],
  controllers: [NomContratoController],
  providers: [NomContratoService],
})
export class NomContratoModule {}
