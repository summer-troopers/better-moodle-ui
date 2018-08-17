import { User } from '@shared/models/user';
import Group from '@shared/models/group';

export class Student extends User {
  groupId: string;
  group?: Group;

  constructor(student: any) {
    super(student);
  }
}
