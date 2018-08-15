import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { InitService } from '@core/services/init/init.service';
import { LoggerInterceptorService } from '@core/interceptors/logger-interceptor/logger-interceptor.service';
import { NavComponent } from '@core/components/nav/nav.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { AuthenticationInterceptorService } from '@core/interceptors/authentication-interceptor/authentication-interceptor.service';
import { AlertService } from '@core/../shared/services/alert/alert.service';
import { UserDropdownComponent } from './components/nav/user-dropdown/user-dropdown/user-dropdown.component';

const COMPONENTS = [
  NavComponent,
  FooterComponent,
  HeaderComponent,
  LayoutComponent,
];

const MODULES = [
  RouterModule,
  NgHttpLoaderModule
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
    UserDropdownComponent,
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    },
    AlertService,
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
