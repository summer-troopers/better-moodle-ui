import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SpecialtyDetailsPageComponent, SpecialtiesPageComponent } from '@modules/specialties/containers';

const routes: Routes = [
  {
    path: ':id',
    component: SpecialtyDetailsPageComponent
  },
  {
    path: '',
    component: SpecialtiesPageComponent
  }
];

export const specialitiesRoutes: ModuleWithProviders = RouterModule.forChild(routes);
