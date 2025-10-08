import { PartialType } from '@nestjs/mapped-types';
import { CreateNomVacacionDto } from './create-nom-vacacion.dto';

export class UpdateNomVacacionDto extends PartialType(CreateNomVacacionDto) {}
