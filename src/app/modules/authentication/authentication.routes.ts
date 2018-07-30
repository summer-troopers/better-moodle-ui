import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecoverPasswordPageComponent, LoginPageComponent} from '@modules/authentication/containers/';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordPageComponent
  }
];

export const authenticationRoutes: ModuleWithProviders = RouterModule.forChild(routes);
