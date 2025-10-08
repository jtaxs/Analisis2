import { PartialType } from '@nestjs/mapped-types';
import { CreateNomHorasExtraDto } from './create-nom-horas-extra.dto';

export class UpdateNomHorasExtraDto extends PartialType(CreateNomHorasExtraDto) {}
