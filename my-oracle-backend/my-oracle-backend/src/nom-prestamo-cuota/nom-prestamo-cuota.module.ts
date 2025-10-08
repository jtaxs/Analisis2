import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomPrestamoCuotaService } from './nom-prestamo-cuota.service';
import { NomPrestamoCuotaController } from './nom-prestamo-cuota.controller';
import { NomPrestamoCuota } from './entities/nom-prestamo-cuota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomPrestamoCuota])],
  controllers: [NomPrestamoCuotaController],
  providers: [NomPrestamoCuotaService],
})
export class NomPrestamoCuotaModule {}
