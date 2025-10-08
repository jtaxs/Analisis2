import { PartialType } from '@nestjs/mapped-types';
import { CreateNomPuestoDto } from './create-nom-puesto.dto';

export class UpdateNomPuestoDto extends PartialType(CreateNomPuestoDto) {}
