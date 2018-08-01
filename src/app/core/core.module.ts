import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InitService} from '@core/services/init/init.service';
import {LoggerInterceptorService} from './interceptors/logger-interceptor.service';
import {NavComponent} from './components/nav/nav.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {LayoutComponent} from './components/layout/layout.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

const COMPONENTS = [
  NavComponent,
  FooterComponent,
  HeaderComponent,
  LayoutComponent
];

const MODULES = [
  RouterModule,
  HttpClientModule,
];

export function initAppFactory(initService: InitService) {
  return () => initService.getConfigurations();
}

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      deps: [InitService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggerInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
