import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsPageComponent, StudentDetailsPageComponent } from './containers/index';

const routes: Routes = [
  {
    path: '',
    component: StudentsPageComponent
  },
  {
    path: ':id',
    component: StudentDetailsPageComponent
  }
];

export const studentsRoutes: ModuleWithProviders = RouterModule.forChild(routes);
