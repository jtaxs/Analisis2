import { PartialType } from '@nestjs/mapped-types';
import { CreateNomLiquidacionDto } from './create-nom-liquidacion.dto';

export class UpdateNomLiquidacionDto extends PartialType(CreateNomLiquidacionDto) {}
