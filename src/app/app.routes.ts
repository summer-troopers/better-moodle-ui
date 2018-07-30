import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from '@modules/authentication/containers/login-page/login-page.component';

const routes: Routes = [
  {
    path: 'teachers',
    loadChildren: './modules/teachers/teachers.module#TeachersModule',
  },
  {
    path: 'auth',
    component: LoginPageComponent,
    pathMatch: 'full',
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
