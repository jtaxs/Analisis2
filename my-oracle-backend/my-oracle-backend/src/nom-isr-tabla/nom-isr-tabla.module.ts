import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomIsrTablaService } from './nom-isr-tabla.service';
import { NomIsrTablaController } from './nom-isr-tabla.controller';
import { NomIsrTabla } from './entities/nom-isr-tabla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomIsrTabla])],
  controllers: [NomIsrTablaController],
  providers: [NomIsrTablaService],
})
export class NomIsrTablaModule {}
