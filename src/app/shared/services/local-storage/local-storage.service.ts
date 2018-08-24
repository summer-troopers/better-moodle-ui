import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  insertLocalStorage(data: any, key: string) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    return localStorage.setItem(key, data);
  }

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  deleteLocalStorage(key: string) {
    localStorage.removeItem((key));
  }
}
