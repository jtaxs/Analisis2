import { PartialType } from '@nestjs/mapped-types';
import { CreateNomNominaDto } from './create-nom-nomina.dto';

export class UpdateNomNominaDto extends PartialType(CreateNomNominaDto) {}
