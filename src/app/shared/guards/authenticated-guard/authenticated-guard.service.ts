import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '@modules/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
    private router: Router) {
  }

  canActivate(): boolean {
    const isAuthenticated = this.authenticationService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('auth');
    }
    return isAuthenticated;
  }
}
