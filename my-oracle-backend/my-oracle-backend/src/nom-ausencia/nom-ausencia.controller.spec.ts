import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ValidationPipe } from '@nestjs/common';
import { NomAusenciaService } from './nom-ausencia.service';
import { CreateNomAusenciaDto } from './dto/create-nom-ausencia.dto';
import { UpdateNomAusenciaDto } from './dto/update-nom-ausencia.dto';

@Controller('nom-ausencia')
export class NomAusenciaController {
  constructor(private readonly nomAusenciaService: NomAusenciaService) {}

  // P8: Registrar Ausencia (con validación)
  @Post()
  create(@Body(new ValidationPipe()) createNomAusenciaDto: CreateNomAusenciaDto) {
    return this.nomAusenciaService.create(createNomAusenciaDto);
  }

  @Get()
  findAll() {
    return this.nomAusenciaService.findAll();
  }
  
  // P6: Generar Constancia de Ausencia
  @Get(':id')
  getConstancia(@Param('id', ParseIntPipe) id: number) {
    return this.nomAusenciaService.getConstancia(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body(new ValidationPipe()) updateNomAusenciaDto: UpdateNomAusenciaDto
  ) {
    return this.nomAusenciaService.update(id, updateNomAusenciaDto);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nomAusenciaService.remove(id);
  }

  // --- Endpoints para Procedimientos ---

  // P1: GET /nom-ausencia/contrato/1/resumen
  @Get('contrato/:contratoId/resumen')
  getResumenPorContrato(@Param('contratoId', ParseIntPipe) contratoId: number) {
    return this.nomAusenciaService.getResumenPorContrato(contratoId);
  }

  // P2: GET /nom-ausencia/reporte/mensual?anio=2025&mes=10
  @Get('reporte/mensual')
  getResumenMensual(
    @Query('anio', ParseIntPipe) anio: number,
    @Query('mes', ParseIntPipe) mes: number
  ) {
    return this.nomAusenciaService.getResumenMensual(anio, mes);
  }

  // P3: GET /nom-ausencia/reporte/alerta-injustificadas?limite=3&tipo=INJUSTIFICADA
  @Get('reporte/alerta-injustificadas')
  getAlertaInjustificadas(
    @Query('limite', ParseIntPipe) limite: number,
    @Query('tipo') tipo?: string,
  ) {
    return this.nomAusenciaService.getAlertaInjustificadas(limite, tipo);
  }

  // P4: GET /nom-ausencia/contrato/1/descuento?anio=2025&mes=10
  @Get('contrato/:contratoId/descuento')
  calcularDescuento(
    @Param('contratoId', ParseIntPipe) contratoId: number,
    @Query('anio', ParseIntPipe) anio: number,
    @Query('mes', ParseIntPipe) mes: number
  ) {
    return this.nomAusenciaService.calcularDescuento(contratoId, anio, mes);
  }

  // P5: POST /nom-ausencia/validar/traslape
  @Post('validar/traslape')
  verificarTraslape(@Body() body: { contratoId: number; fechaInicio: string; fechaFin: string }) {
    return this.nomAusenciaService.verificarTraslape(body.contratoId, new Date(body.fechaInicio), new Date(body.fechaFin));
  }

  // P7: GET /nom-ausencia/reporte/prolongadas?dias=15
  @Get('reporte/prolongadas')
  getAusenciasProlongadas(@Query('dias', ParseIntPipe) dias: number) {
    return this.nomAusenciaService.getAusenciasProlongadas(dias);
  }

  // P9: DELETE /nom-ausencia/contrato/1
  @Delete('contrato/:contratoId')
  removePorContrato(@Param('contratoId', ParseIntPipe) contratoId: number) {
    return this.nomAusenciaService.removePorContrato(contratoId);
  }

  // P10: GET /nom-ausencia/contrato/1/total-dias?fechaInicio=2025-01-01&fechaFin=2025-12-31
  @Get('contrato/:contratoId/total-dias')
  getTotalDiasPorRango(
    @Param('contratoId', ParseIntPipe) contratoId: number,
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.nomAusenciaService.getTotalDiasAusentesPorRango(contratoId, new Date(fechaInicio), new Date(fechaFin));
  }
}