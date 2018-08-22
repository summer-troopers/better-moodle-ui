import { User } from '@shared/models/user';
import Group from '@shared/models/group';

export class Student extends User {
  group?: Group;
  labReportCount?: number;

  constructor(student: any) {
    super(student);
  }
}
