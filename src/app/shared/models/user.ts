import { UserType } from '@shared/models/user-type';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userRole: any;

  constructor(userFromStorage: any) {
    this.id = userFromStorage.id;
    this.firstName = userFromStorage.firstName;
    this.lastName = userFromStorage.lastName;
    this.email = userFromStorage.email;
    this.phoneNumber = userFromStorage.phoneNumber;
    this.userRole = userFromStorage.userRole;

    if (userFromStorage.userRole === 'admin') {
      this.userRole = UserType.Admin;
    }
    if (userFromStorage.userRole === 'student') {
      this.userRole = UserType.Student;
    }
    if (userFromStorage.userRole === 'teacher') {
      this.userRole = UserType.Teacher;
    }
  }

  isAdmin(): boolean {
    return this.userRole === UserType.Admin;
  }

  isTeacher(): boolean {
    return this.userRole === UserType.Teacher;
  }

  isStudent(): boolean {
    return this.userRole === UserType.Student;
  }

}
