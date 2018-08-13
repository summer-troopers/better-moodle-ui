import { UserType } from '@shared/models/user-type';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  groupId?: number;
  specialtyId?: number;
  userRole: any;

  constructor(user: any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.userRole = user.userRole;

    switch (user.userRole) {
      case UserType.Admin:
        this.userRole = UserType.Admin;
        break;
      case UserType.Student:
        this.userRole = UserType.Student;
        break;
      case UserType.Teacher:
        this.userRole = UserType.Teacher;
        break;
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
