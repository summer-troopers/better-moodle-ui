import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  protected url = 'http://localhost:3000/api/v1';
  user: object;
  constructor(private http: HttpClient) { }
  submitLoginDate(user): Observable<Object> {
    return this.http.post(this.url + '/login', user) as Observable<Object>;
  }

  saveTokenLocalStorage(data) {
    localStorage.setItem('authorization', JSON.stringify(data.token));
  }

  setUser(data) {
    this.user = data.userData;
    console.log(this.user);
  }

  getUser() {
    return this.user;
  }
}
