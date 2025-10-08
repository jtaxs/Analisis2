import { PartialType } from '@nestjs/mapped-types';
import { CreateNomJornadaDto } from './create-nom-jornada.dto';

export class UpdateNomJornadaDto extends PartialType(CreateNomJornadaDto) {}
