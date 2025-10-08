import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NomDepartamentoModule } from './nom-departamento/nom-departamento.module';
import { NomPuestoModule } from './nom-puesto/nom-puesto.module';
import { NomTipoContratoModule } from './nom-tipo-contrato/nom-tipo-contrato.module';
import { NomPeriodicidadModule } from './nom-periodicidad/nom-periodicidad.module';
import { NomBancoModule } from './nom-banco/nom-banco.module';
import { NomJornadaModule } from './nom-jornada/nom-jornada.module';
import { NomEmpleadoModule } from './nom-empleado/nom-empleado.module';
import { NomEmpleadoContactoModule } from './nom-empleado-contacto/nom-empleado-contacto.module';
import { NomEmpleadoCuentaModule } from './nom-empleado-cuenta/nom-empleado-cuenta.module';
import { NomContratoModule } from './nom-contrato/nom-contrato.module';
import { NomSalarioHistModule } from './nom-salario-hist/nom-salario-hist.module';
import { NomIgssParamModule } from './nom-igss-param/nom-igss-param.module';
import { NomIsrTablaModule } from './nom-isr-tabla/nom-isr-tabla.module';
import { NomConceptoModule } from './nom-concepto/nom-concepto.module';
import { NomPeriodoNominaModule } from './nom-periodo-nomina/nom-periodo-nomina.module';
import { NomNominaModule } from './nom-nomina/nom-nomina.module';
import { NomNominaDetalleModule } from './nom-nomina-detalle/nom-nomina-detalle.module';
import { NomHorasExtraModule } from './nom-horas-extra/nom-horas-extra.module';
import { NomAusenciaModule } from './nom-ausencia/nom-ausencia.module';
import { NomVacacionModule } from './nom-vacacion/nom-vacacion.module';
import { NomPrestamoModule } from './nom-prestamo/nom-prestamo.module';
import { NomPrestamoCuotaModule } from './nom-prestamo-cuota/nom-prestamo-cuota.module';
import { NomBonoModule } from './nom-bono/nom-bono.module';
import { NomLiquidacionModule } from './nom-liquidacion/nom-liquidacion.module';
import { NomAuditLogModule } from './nom-audit-log/nom-audit-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      sid: 'xe',
      username: 'NOMINA_GT',
      password: '123456',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    NomDepartamentoModule,
    NomPuestoModule,
    NomTipoContratoModule,
    NomPeriodicidadModule,
    NomBancoModule,
    NomJornadaModule,
    NomEmpleadoModule,
    NomEmpleadoContactoModule,
    NomEmpleadoCuentaModule,
    NomContratoModule,
    NomSalarioHistModule,
    NomIgssParamModule,
    NomIsrTablaModule,
    NomConceptoModule,
    NomPeriodoNominaModule,
    NomNominaModule,
    NomNominaDetalleModule,
    NomHorasExtraModule,
    NomAusenciaModule,
    NomVacacionModule,
    NomPrestamoModule,
    NomPrestamoCuotaModule,
    NomBonoModule,
    NomLiquidacionModule,
    NomAuditLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
