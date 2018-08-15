import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getUserLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    let parsedItem;
    try {
      parsedItem = JSON.parse(item);
    } catch (err) {
      alert('USER_UNDEFINED !!!');
    }

    return parsedItem;
  }
}
