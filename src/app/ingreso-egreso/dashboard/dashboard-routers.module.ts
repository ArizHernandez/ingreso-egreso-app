import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { routesDashboard } from './dashboard.routing';
// import { AuthGuard } from '../services/auth.guard';

const childRoutes:Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    children: routesDashboard,
    // canActivate: [AuthGuard], 
  },
] 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutersModule { }
