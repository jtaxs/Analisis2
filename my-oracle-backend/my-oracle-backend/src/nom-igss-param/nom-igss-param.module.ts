import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomIgssParamService } from './nom-igss-param.service';
import { NomIgssParamController } from './nom-igss-param.controller';
import { NomIgssParam } from './entities/nom-igss-param.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NomIgssParam])],
  controllers: [NomIgssParamController],
  providers: [NomIgssParamService],
})
export class NomIgssParamModule {}
