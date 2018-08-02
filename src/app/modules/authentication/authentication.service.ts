import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@shared/constants';
import { BackendApiService } from '@core/services/api/backend-api.service';
import User from '@shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private backendApiService: BackendApiService) {
  }

  login(loginDataUser: User): Observable<any> {
    return this.backendApiService.post('login', loginDataUser) as Observable<any>;
  }

  insertTokenLocalStorage(token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  }

  insertUserLocalStorage(user: User) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  getUserLocalStorage() {
    return localStorage.getItem(USER_STORAGE_KEY);
  }

  getTokenLocalStorage() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  isAuthenticated() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const user = localStorage.getItem(USER_STORAGE_KEY);

    if (token && user) {
      return true;
    }
    return false;
  }
}
