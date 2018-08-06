import { Student } from '@shared/models/student';
import { Teacher } from '@shared/models/teacher';
import { Admin } from '@shared/models/admins';
import { UserType } from '@shared/models/user-type';

export function CreateUser(user): any {
  if (user.role === UserType.Student) {
    return new Student(user);
  }

  if (user.role === UserType.Teacher) {
    return new Teacher(user);
  }

  if (user.role === UserType.Admin) {
    return new Admin(user);
  }
  return null;
}
