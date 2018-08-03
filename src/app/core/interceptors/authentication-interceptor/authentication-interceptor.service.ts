import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@modules/authentication/authentication.service';
<<<<<<< HEAD
import { AlertService } from '@shared/services/alert/alert.service';
=======
import { AlertService } from '@core/services/alert/alert.service';
>>>>>>> [FIXED][TASK-4046] delete httpheader in techer-service and modify models

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
    private alertService: AlertService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
<<<<<<< HEAD
=======

>>>>>>> [FIXED][TASK-4046] delete httpheader in techer-service and modify models
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 403 && this.authenticationService.isAuthenticated()) {
        this.authenticationService.logOut();
        this.alertService.error('Authentication expired!');
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
