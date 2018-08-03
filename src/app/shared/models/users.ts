export enum UserType {
  Student,
  Teacher,
  Admin
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserType;


  constructor(userFromStorage: any) {
    if (userFromStorage.role === 'admin') {
      this.role = UserType.Admin;
    }
    if (userFromStorage.role === 'student') {
      this.role = UserType.Student;
    }
    if (userFromStorage.role === 'teacher') {
      this.role = UserType.Teacher;
    }
    this.id = userFromStorage.id;
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

