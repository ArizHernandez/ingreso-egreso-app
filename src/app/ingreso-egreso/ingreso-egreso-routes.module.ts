import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { routesDashboard } from './dashboard/dashboard.routing';


const dashboardRoutes:Routes = [
  { 
    path: '', 
    component: DashboardComponent, 
    children: routesDashboard 
  },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild( dashboardRoutes ) ],
  exports: [ RouterModule ]
})
export class IngresoEgresoRoutesModule { }
