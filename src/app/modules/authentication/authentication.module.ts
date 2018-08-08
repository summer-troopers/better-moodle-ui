import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authenticationRoutes } from '@modules/authentication/authentication.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent, RecoverPasswordPageComponent } from './containers/';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    authenticationRoutes,
    SharedModule
  ],
  declarations: [LoginPageComponent, RecoverPasswordPageComponent],
  providers: [],
})
export class AuthenticationModule {
}
