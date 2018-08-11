import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@shared/constants';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { User } from '@shared/models/user';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private backendApiService: BackendApiService,
    private localStorageService: LocalStorageService,
    private router: Router) {
  }

  login(loginDataUser: User): Observable<any> {
    return this.backendApiService.post('login', loginDataUser) as Observable<any>;
  }

  isAuthenticated() {
    const token = this.localStorageService.getLocalStorage(TOKEN_STORAGE_KEY);
    const user = this.localStorageService.getLocalStorage(USER_STORAGE_KEY);

    if (token && user) {
      return true;
    }
    return false;
  }

  logOut() {
    this.localStorageService.deleteLocalStorage(USER_STORAGE_KEY);
    this.localStorageService.deleteLocalStorage(TOKEN_STORAGE_KEY);
    this.router.navigateByUrl('auth');
  }
}
