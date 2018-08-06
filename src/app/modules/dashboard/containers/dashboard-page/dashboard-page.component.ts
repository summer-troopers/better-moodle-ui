import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { CreateUser } from '@shared/models/user-factory';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
/*    localStorage.setItem('user', JSON.stringify({
        id: 1,
        firstName: 'Che',
        lastName: 'Guevara',
        email: 'lalala@gmail.com',
        phoneNumber: '069383481',
        idSpecialty: 3,
        userRole: 'teacher'
      }
    ));*/
    const userFromStorage = JSON.parse(this.userService.getUserLocalStorage('user'));
    console.log (userFromStorage);
    const loggedUser = CreateUser(userFromStorage);
    this.user = loggedUser;
  }

  ngOnDestroy() {
  }
}

