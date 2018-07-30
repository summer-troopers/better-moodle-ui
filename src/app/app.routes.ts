import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {
    path: 'teachers',
    loadChildren: './modules/teachers/teachers.module#TeachersModule'
  },
  {
    path: 'groups',
    loadChildren: '@modules/groups/groups.module#GroupsModule'
  },
  {
    path: 'specialties',
    loadChildren: '@modules/specialties/specialties.module#SpecialtiesModule'
  },
  {
    path: 'courses',
    loadChildren: '@modules/courses/courses.module#CoursesModule'
  },
  {
    path: 'students',
    loadChildren: './modules/students/students.module#StudentsModule'
  },
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
