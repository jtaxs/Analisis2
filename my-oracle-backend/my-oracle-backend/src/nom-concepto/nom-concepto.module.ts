import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomConceptoService } from './nom-concepto.service';
import { NomConceptoController } from './nom-concepto.controller';
import { NomConcepto } from './entities/nom-concepto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomConcepto])],
  controllers: [NomConceptoController],
  providers: [NomConceptoService],
})
export class NomConceptoModule {}
