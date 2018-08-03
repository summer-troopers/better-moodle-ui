import { User } from '@shared/models/users';

export interface Teacher extends User {
  idSpecialty: number;
}
