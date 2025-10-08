import { PartialType } from '@nestjs/mapped-types';
import { CreateNomPeriodoNominaDto } from './create-nom-periodo-nomina.dto';

export class UpdateNomPeriodoNominaDto extends PartialType(CreateNomPeriodoNominaDto) {}
