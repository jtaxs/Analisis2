import { PartialType } from '@nestjs/mapped-types';
import { CreateNomTipoContratoDto } from './create-nom-tipo-contrato.dto';

export class UpdateNomTipoContratoDto extends PartialType(CreateNomTipoContratoDto) {}
