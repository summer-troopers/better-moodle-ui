import { Student } from '@shared/models/student';
import { Teacher } from '@shared/models/teacher';
import { Admin } from '@shared/models/admin';
import { UserType } from '@shared/models/user-type';

export function CreateUser(user): any {
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
