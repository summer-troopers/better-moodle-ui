import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeModule } from '@modules/home/home.module';
import { SharedModule } from '@shared/shared.module';
import { DeleteModalComponent } from './shared/components/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    CoreModule,
    HomeModule,
    appRoutes,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
