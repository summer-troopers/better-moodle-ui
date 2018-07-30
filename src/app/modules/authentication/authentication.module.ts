import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {authenticationRoutes} from '@modules/authentication/authentication.routes';
import {AuthenticationService} from '@modules/authentication/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RecoverPasswordPageComponent, LoginPageComponent } from './containers/';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    authenticationRoutes
  ],
  declarations: [LoginPageComponent, RecoverPasswordPageComponent],
  providers: [AuthenticationService],
})
export class AuthenticationModule { }
