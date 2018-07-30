import {RouterModule, Routes} from '@angular/router';
import { CoursesPageComponent, CourseDetailsPageComponent } from '@modules/courses/containers';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {
    path: ':id',
    component: CourseDetailsPageComponent
  },
  {
    path: '',
    component: CoursesPageComponent
  }
];

export const coursesRoutes: ModuleWithProviders = RouterModule.forChild(routes);
