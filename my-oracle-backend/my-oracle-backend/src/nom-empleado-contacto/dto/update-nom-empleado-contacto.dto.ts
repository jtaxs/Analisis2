import { PartialType } from '@nestjs/mapped-types';
import { CreateNomEmpleadoContactoDto } from './create-nom-empleado-contacto.dto';

export class UpdateNomEmpleadoContactoDto extends PartialType(CreateNomEmpleadoContactoDto) {}
