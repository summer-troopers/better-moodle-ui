import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardPageComponent} from '@modules/dashboard/containers/dashboard-page/dashboard-page.component';
import {HomePageComponent} from '@modules/home/home-page/home-page.component';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'teachers',
    loadChildren: './modules/teachers/teachers.module#TeachersModule',
  },
  {
    path: 'students',
    loadChildren: './modules/students/students.module#StudentsModule'
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
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: HomePageComponent
  }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
