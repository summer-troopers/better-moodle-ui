import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule} from './core/core.module';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {AuthenticationModule} from '@modules/authentication/authentication.module';
import {appRoutes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    appRoutes,
    AuthenticationModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
