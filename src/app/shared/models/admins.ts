import { User } from '@shared/models/user';

export class Admin extends User {

  constructor(adminFromStorage: any) {
    super(adminFromStorage);
  }
}
