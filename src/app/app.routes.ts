import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'teachers',
    loadChildren: './modules/teachers/teachers.module#TeachersModule'
  },
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
