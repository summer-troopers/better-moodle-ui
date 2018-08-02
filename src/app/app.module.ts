import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@core/core.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { appRoutes } from './app.routes';
import { DashboardModule } from '@modules/dashboard/dashboard.module';

const MODULES = [
  BrowserModule,
  CoreModule,
  DashboardModule,
  AuthenticationModule,
  FormsModule
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ...MODULES,
    appRoutes,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
