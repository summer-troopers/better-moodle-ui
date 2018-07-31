import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from '@core/core.module';

import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {DashboardModule} from '@modules/dashboard/dashboard.module';
import {HomeModule} from '@modules/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HomeModule,
    DashboardModule,
    appRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
