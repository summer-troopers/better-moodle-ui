import { UserType } from '@shared/models/user-type';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: any;

  constructor(userFromStorage: any) {
    this.id = userFromStorage.id;
    this.firstName = userFromStorage.firstName;
    this.lastName = userFromStorage.lastName;
    this.email = userFromStorage.email;
    this.phoneNumber = userFromStorage.phoneNumber;
    this.role = userFromStorage.role;

    if (userFromStorage.role === 'admin') {
      this.role = UserType.Admin;
    }
    if (userFromStorage.role === 'student') {
      this.role = UserType.Student;
    }
    if (userFromStorage.role === 'teacher') {
      this.role = UserType.Teacher;
    }
  }

  isAdmin(): boolean {
    return this.role === UserType.Admin;
  }

  isTeacher(): boolean {
    return this.role === UserType.Teacher;
  }

  isStudent(): boolean {
    return this.role === UserType.Student;
  }

}
