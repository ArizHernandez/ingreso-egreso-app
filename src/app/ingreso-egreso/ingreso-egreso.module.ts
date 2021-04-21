import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { OrderIngresoPipe } from './order-ingreso.pipe';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrderIngresoPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    AppRoutingModule
  ],
  exports: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
  ]
})
export class IngresoEgresoModule { }
