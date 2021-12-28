import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routing';
import { RouterModule } from '@angular/router';

const rutasHijas = [
  {path: '', component: DashboardComponent, children: dashboardRoutes},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
