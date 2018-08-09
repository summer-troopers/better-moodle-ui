import { User } from '@shared/models/user';

export class Student extends User {
  idGroup: number;

  constructor(student: any) {
    super(student);
    this.idGroup = student.idGroup;
  }
}
