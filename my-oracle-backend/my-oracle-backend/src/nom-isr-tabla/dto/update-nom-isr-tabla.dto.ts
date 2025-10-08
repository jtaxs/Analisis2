import { PartialType } from '@nestjs/mapped-types';
import { CreateNomIsrTablaDto } from './create-nom-isr-tabla.dto';

export class UpdateNomIsrTablaDto extends PartialType(CreateNomIsrTablaDto) {}
