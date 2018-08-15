import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getUserLocalStorage(key: string) {
    const a = localStorage.getItem(key);
    return JSON.parse(a);
  }
}
