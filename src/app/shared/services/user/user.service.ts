import { Injectable } from '@angular/core';
import { Student } from '@shared/models/student';
import { UserType } from '@shared/models/user-type';
import { Admin } from '@shared/models/admin';
import { Teacher } from '@shared/models/teacher';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;

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

  createUser(user): any {
    if (user.userRole === UserType.Student) {
      return new Student(user);
    }

    if (user.userRole === UserType.Teacher) {
      return new Teacher(user);
    }

    if (user.userRole === UserType.Admin) {
      return new Admin(user);
    }
    return null;
  }

  getUser(): any {
    const userFromStorage = this.getUserLocalStorage('user');
    this.user = this.createUser(userFromStorage);
    return this.user;
  }
<<<<<<< HEAD
=======

  updateUser(user): any {
    return localStorage.setItem('user', JSON.stringify(user)),
      this.getUserLocalStorage('user');
  }
>>>>>>> test
}
