import { User } from '@shared/models/users';

export interface Student extends User{
  idGroup: number;
}
