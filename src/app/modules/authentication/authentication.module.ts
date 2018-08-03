import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { authenticationRoutes } from '@modules/authentication/authentication.routes';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { RecoverPasswordPageComponent, LoginPageComponent } from './containers';

const COMPONENTS = [
  LoginPageComponent,
  RecoverPasswordPageComponent
];

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  imports: [
    ...MODULES,
    authenticationRoutes
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [AuthenticationService],
})
export class AuthenticationModule {
}
