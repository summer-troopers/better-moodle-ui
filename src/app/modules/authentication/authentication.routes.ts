import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from '@modules/authentication/containers/login-page/login-page.component';
import {RecoverPasswordPageComponent} from '@modules/authentication/containers/recover-password-page/recover-password-page.component';

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
