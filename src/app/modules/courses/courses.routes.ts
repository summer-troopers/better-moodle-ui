import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CourseDetailsPageComponent, CoursesPageComponent } from '@modules/courses/containers';

const routes: Routes = [
  {
    path: '',
    component: CoursesPageComponent
  },
  {
    path: ':id',
    component: CourseDetailsPageComponent
  }
];

export const coursesRoutes: ModuleWithProviders = RouterModule.forChild(routes);
