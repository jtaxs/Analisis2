import { PartialType } from '@nestjs/mapped-types';
import { CreateNomBonoDto } from './create-nom-bono.dto';

export class UpdateNomBonoDto extends PartialType(CreateNomBonoDto) {}
