import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {authenticationRoutes} from '@modules/authentication/authentication.routes';
import {AuthenticationService} from '@modules/authentication/authentication.service';
import {ReactiveFormsModule} from '@angular/forms';
import { RecoverPasswordPageComponent, LoginPageComponent } from './containers/';

@NgModule({
  imports: [
    CommonModule,
    authenticationRoutes,
    ReactiveFormsModule,
  ],
  exports: [LoginPageComponent, RecoverPasswordPageComponent],
  declarations: [LoginPageComponent, RecoverPasswordPageComponent],
  providers: [AuthenticationService],
})
export class AuthenticationModule { }
