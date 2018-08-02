import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthenticationService } from '@modules/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService) {
  }

  canActivate() {
    return this.authenticationService.isAuthenticated();
  }
}
