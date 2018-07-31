import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardPageComponent} from '@modules/dashboard/containers/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent
  }
];

export const dashboardRoutes: ModuleWithProviders = RouterModule.forChild(routes);
