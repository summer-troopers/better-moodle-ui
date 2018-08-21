import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user/user.service';
import { createUser } from '@shared/models/user-factory';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{
  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    const userFromStorage = this.userService.getUserLocalStorage('user');
    this.user = createUser(userFromStorage);
  }
}

