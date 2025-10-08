import { PartialType } from '@nestjs/mapped-types';
import { CreateNomEmpleadoCuentaDto } from './create-nom-empleado-cuenta.dto';

export class UpdateNomEmpleadoCuentaDto extends PartialType(CreateNomEmpleadoCuentaDto) {}
