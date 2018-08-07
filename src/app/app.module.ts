import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeModule } from '@modules/home/home.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    CoreModule,
<<<<<<< HEAD
=======
    SharedModule,
>>>>>>> preloader fix
    HomeModule,
    appRoutes,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
