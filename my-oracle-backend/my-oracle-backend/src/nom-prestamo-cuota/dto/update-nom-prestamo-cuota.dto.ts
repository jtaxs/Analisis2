import { PartialType } from '@nestjs/mapped-types';
import { CreateNomPrestamoCuotaDto } from './create-nom-prestamo-cuota.dto';

export class UpdateNomPrestamoCuotaDto extends PartialType(CreateNomPrestamoCuotaDto) {}
