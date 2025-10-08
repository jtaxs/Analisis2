import { PartialType } from '@nestjs/mapped-types';
import { CreateNomContratoDto } from './create-nom-contrato.dto';

export class UpdateNomContratoDto extends PartialType(CreateNomContratoDto) {}
