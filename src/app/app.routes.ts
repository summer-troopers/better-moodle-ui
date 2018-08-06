import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@modules/home/home-page/home-page.component';
import { AuthenticatedGuardService } from '@shared/guards/authenticated-guard/authenticated-guard.service';
import { DeauthenticatedGuardService } from '@shared/guards/deauthenticated-guard/deauthenticated-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule',
    canActivate: [DeauthenticatedGuardService]
  },
  {
    path: 'teachers',
    loadChildren: './modules/teachers/teachers.module#TeachersModule',
    canActivate: [AuthenticatedGuardService]
  },
  {
    path: 'students',
    loadChildren: './modules/students/students.module#StudentsModule',
    canActivate: [AuthenticatedGuardService]
  },
  {
    path: 'groups',
    loadChildren: '@modules/groups/groups.module#GroupsModule',
    canActivate: [AuthenticatedGuardService]
  },
  {
    path: 'specialties',
    loadChildren: '@modules/specialties/specialties.module#SpecialtiesModule',
    canActivate: [AuthenticatedGuardService]
  },
  {
    path: 'courses',
    loadChildren: '@modules/courses/courses.module#CoursesModule',
    canActivate: [AuthenticatedGuardService] 
  },
  {
    path: 'dashboard',
    loadChildren: '@modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthenticatedGuardService]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthenticatedGuardService]
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthenticatedGuardService]
  },
  {
    path: '**',
    component: HomePageComponent,
    pathMatch: 'full',
    canActivate: [AuthenticatedGuardService]
  }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
