import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {
    path: 'teachers',
    loadChildren: './modules/teachers/teachers.module#TeachersModule'
  },
  {
    path: 'groups',
    loadChildren: '@modules/groups/groups.modules#GroupsModule'
  },
  {
    path: 'specialties',
    loadChildren: '@modules/specialties/specialties.module#SpecialtiesModule'
  }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
