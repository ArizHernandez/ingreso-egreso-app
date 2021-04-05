import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    IngresoEgresoModule
  ],
  exports:[
    SharedModule,
    AuthModule,
    DashboardModule,
    IngresoEgresoModule
  ]
})
export class PagesModule { }
