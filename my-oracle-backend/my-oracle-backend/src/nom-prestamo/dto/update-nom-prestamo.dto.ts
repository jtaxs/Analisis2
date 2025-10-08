import { PartialType } from '@nestjs/mapped-types';
import { CreateNomPrestamoDto } from './create-nom-prestamo.dto';

export class UpdateNomPrestamoDto extends PartialType(CreateNomPrestamoDto) {}
