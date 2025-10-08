import { PartialType } from '@nestjs/mapped-types';
import { CreateNomBancoDto } from './create-nom-banco.dto';

export class UpdateNomBancoDto extends PartialType(CreateNomBancoDto) {}
