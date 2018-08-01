import { Injectable } from '@angular/core';
import {TOKEN_STORAGE_KEY, USER_STORAGE_KEY} from '@shared/constants';
import {BackendApiService} from '@core/services/api/backend-api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private backendApiService: BackendApiService) { }

  submitLoginDate(user): Observable<any> {
    return this.backendApiService.post('login', user) as Observable<any>;
  }

  login(data) {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(data.token));
  }

  setUser(data) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify((data.userData)));
  }

  getUser() {
    return localStorage.getItem(USER_STORAGE_KEY);
  }

  getToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  isAuthenticated() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const user = localStorage.getItem(USER_STORAGE_KEY);

    if (token && user) { return true; }
    return false;
  }
}
