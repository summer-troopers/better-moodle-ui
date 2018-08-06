import { User } from '@shared/models/user';

export class Student extends User {
  idGroup: number;

  constructor(studentFromStorage: any) {
    super(studentFromStorage);
    this.idGroup = studentFromStorage.idGroup;
  }
}
