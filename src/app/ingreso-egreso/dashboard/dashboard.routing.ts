import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso.component';
import { DetalleComponent } from '../detalle/detalle.component';

export const routesDashboard:Routes = [
  { path:'', component: EstadisticaComponent },
  { path:'ingreso-egreso', component: IngresoEgresoComponent },
  { path:'detalle', component: DetalleComponent },
  { path: '**', pathMatch: 'full', redirectTo:'' }
];