import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducers';



@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent, 
    EstadisticaComponent, 
    IngresoEgresoComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule,
    DashboardRoutesModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
