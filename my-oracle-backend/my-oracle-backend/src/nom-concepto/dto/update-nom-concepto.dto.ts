import { PartialType } from '@nestjs/mapped-types';
import { CreateNomConceptoDto } from './create-nom-concepto.dto';

export class UpdateNomConceptoDto extends PartialType(CreateNomConceptoDto) {}
