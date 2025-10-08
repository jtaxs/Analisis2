import { PartialType } from '@nestjs/mapped-types';
import { CreateNomIgssParamDto } from './create-nom-igss-param.dto';

export class UpdateNomIgssParamDto extends PartialType(CreateNomIgssParamDto) {}
