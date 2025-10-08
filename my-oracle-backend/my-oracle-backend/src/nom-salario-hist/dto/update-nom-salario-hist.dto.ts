import { PartialType } from '@nestjs/mapped-types';
import { CreateNomSalarioHistDto } from './create-nom-salario-hist.dto';

export class UpdateNomSalarioHistDto extends PartialType(CreateNomSalarioHistDto) {}
