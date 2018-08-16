import { User } from '@shared/models/user';

export class Teacher extends User {
  specialtyId: string;

  constructor(teacher: any) {
    super(teacher);
    this.specialtyId = teacher.specialtyId;

  }
}
