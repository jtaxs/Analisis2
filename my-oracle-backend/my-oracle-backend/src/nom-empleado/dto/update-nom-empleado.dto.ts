import { PartialType } from '@nestjs/mapped-types';
import { CreateNomEmpleadoDto } from './create-nom-empleado.dto';

export class UpdateNomEmpleadoDto extends PartialType(CreateNomEmpleadoDto) {}
