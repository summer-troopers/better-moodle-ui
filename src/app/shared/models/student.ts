import { User } from '@shared/models/user';

export class Student extends User {
  groupId: number;

  constructor(student: any) {
    super(student);
    this.groupId = student.groupId;
  }
}
