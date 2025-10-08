import { PartialType } from '@nestjs/mapped-types';
import { CreateNomAusenciaDto } from './create-nom-ausencia.dto';

export class UpdateNomAusenciaDto extends PartialType(CreateNomAusenciaDto) {}
