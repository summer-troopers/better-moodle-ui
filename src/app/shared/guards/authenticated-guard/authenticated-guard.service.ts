import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuardService implements CanActivate {

  isLoggedIn = true;

  isAdmin = false;
  isTeacher = false;
  isStudent = false;


  constructor() {
  }

  canActivate() {
    return this.isLoggedIn;
  }

  canActivateRouteByRole() {
    // here will be check for user role 
  }
}
