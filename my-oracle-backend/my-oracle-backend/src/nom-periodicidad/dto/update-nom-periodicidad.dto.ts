import { PartialType } from '@nestjs/mapped-types';
import { CreateNomPeriodicidadDto } from './create-nom-periodicidad.dto';

export class UpdateNomPeriodicidadDto extends PartialType(CreateNomPeriodicidadDto) {}
