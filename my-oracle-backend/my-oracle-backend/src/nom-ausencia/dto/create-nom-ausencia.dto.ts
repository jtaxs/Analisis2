import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNomAusenciaDto {
  @IsInt()
  @IsNotEmpty({ message: 'El ID del contrato no puede estar vacío.' })
  conContratoId: number;

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de inicio no puede estar vacía.' })
  ausFechaInicio: string;

  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de fin no puede estar vacía.' })
  ausFechaFin: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de ausencia no puede estar vacío.' })
  @MaxLength(30)
  ausTipo: string;

  @IsString()
  @IsOptional()
  @IsIn(['S', 'N'])
  @MaxLength(1)
  ausRemunerada?: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  ausObservaciones?: string;
}