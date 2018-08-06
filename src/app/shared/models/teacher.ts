import { User } from '@shared/models/user';

export class Teacher extends User {
  idSpecialty: number;

  constructor(teacherFromStorage: any) {
    super(teacherFromStorage);
    this.idSpecialty = teacherFromStorage.idSpecialty;

  }
}
