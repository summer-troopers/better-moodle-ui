import { User } from '@shared/models/user';

export class Admin extends User {

  constructor(admin: any) {
    super(admin);
  }
}
