import { RouterModule, Routes } from '@angular/router';
import { CoursesPageComponent, CourseDetailsPageComponent } from '@modules/courses/containers';
import { ModuleWithProviders } from '@angular/core';

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
