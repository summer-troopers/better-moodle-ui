import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerInterceptorService } from './core/interceptors/logger-interceptor.service';
import { PagePreloaderSpinnerComponent } from './core/components/page-preloader-spinner/page-preloader-spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PagePreloaderSpinnerComponent]
})
export class AppComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  currentUrl: String;

  requestMessage: string;

  constructor(private spinner: PagePreloaderSpinnerComponent,
    private router: Router,
    private interceptor: LoggerInterceptorService) { }

  ngOnInit() {
    this.spinnerHandle();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  spinnerHandle() {
    // this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.currentUrl = event.url;
    //     if (this.currentUrl) {
    //       //this.spinner.showSpinner();
    //       console.log('sund diferite');
    //       // this.spinner.hideSpinner();
    //     }

    //   }


    this.interceptor.showMessage(this.requestMessage);
    setTimeout(() => {
      console.log('fasgasgas')
    }, 2000)

  }

}

}
