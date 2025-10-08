import { PartialType } from '@nestjs/mapped-types';
import { CreateNomDepartamentoDto } from './create-nom-departamento.dto';

export class UpdateNomDepartamentoDto extends PartialType(CreateNomDepartamentoDto) {}
