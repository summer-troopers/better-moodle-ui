import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AlertService } from '@shared/services/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsInterceptorService implements HttpInterceptor {

  constructor(private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 403) {
        this.alertService.error('You don`t have permissions to do this action!');
      } else if (err.status === 409) {
        this.alertService.error('This method could not be performed on this resource because another resourse depend on this one.');
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

}

