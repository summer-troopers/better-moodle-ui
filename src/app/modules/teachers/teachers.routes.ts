import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersPageComponent, TeacherDetailsPageComponent } from './containers/index';

const routes: Routes = [
  {
    path: '',
    component: TeachersPageComponent
  },
  {
    path: ':id',
    component: TeacherDetailsPageComponent
  }
];

export const teacherRoutes: ModuleWithProviders = RouterModule.forChild(routes);
