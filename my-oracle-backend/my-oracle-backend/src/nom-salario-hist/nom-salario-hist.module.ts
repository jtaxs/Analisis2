import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomSalarioHistService } from './nom-salario-hist.service';
import { NomSalarioHistController } from './nom-salario-hist.controller';
import { NomSalarioHist } from './entities/nom-salario-hist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomSalarioHist])],
  controllers: [NomSalarioHistController],
  providers: [NomSalarioHistService],
})
export class NomSalarioHistModule {}
