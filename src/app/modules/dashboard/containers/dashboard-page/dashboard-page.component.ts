import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/users';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public user =
    {
      id: 1,
      firstName: 'Che',
      lastName: 'Guevara',
      email: 'lalala@gmail.com',
      phoneNumber: '069383481',
      idSpecialty: 3,
      role: 'student'
    };


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    localStorage.setItem('user', JSON.stringify(this.user));
    const userFromStorage = JSON.parse(this.userService.getUserLocalStorage('user'));
    console.log(userFromStorage);
    const user = new User(userFromStorage);
    console.log(user.isAdmin());
  }

  ngOnDestroy() {
  }
}
