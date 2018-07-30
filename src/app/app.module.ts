<<<<<<< HEAD
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {CoreModule} from '@core/core.module';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {DashboardModule} from '@modules/dashboard/dashboard.module';
=======
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule} from './core/core.module';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {AuthenticationModule} from '@modules/authentication/authentication.module';
import {appRoutes} from './app.routes';
>>>>>>> Authentication module

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
<<<<<<< HEAD
    DashboardModule,
    appRoutes
=======
    appRoutes,
    AuthenticationModule,
    FormsModule,
>>>>>>> Authentication module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
