import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getUserLocalStorage(key: string) {
    return localStorage.getItem(key);
  }
}
