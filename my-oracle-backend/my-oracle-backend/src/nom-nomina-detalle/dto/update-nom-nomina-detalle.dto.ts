import { PartialType } from '@nestjs/mapped-types';
import { CreateNomNominaDetalleDto } from './create-nom-nomina-detalle.dto';

export class UpdateNomNominaDetalleDto extends PartialType(CreateNomNominaDetalleDto) {}
