import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
<<<<<<< HEAD
import {DashboardPageComponent} from '@modules/dashboard/containers/dashboard-page/dashboard-page.component';
=======
import {LoginPageComponent} from '@modules/authentication/containers/login-page/login-page.component';
>>>>>>> Authentication module

const routes: Routes = [
  {
    path: 'teachers',
    loadChildren: './modules/teachers/teachers.module#TeachersModule',
  },
  {
    path: 'auth',
<<<<<<< HEAD
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
=======
    component: LoginPageComponent,
    pathMatch: 'full',
>>>>>>> Authentication module
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
    loadChildren: '@modules/students/students.module#StudentsModule'
  },
  {
    path: '',
    component: DashboardPageComponent
  }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
