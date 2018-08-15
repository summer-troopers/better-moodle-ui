import { Component, OnInit } from '@angular/core';

import { NavBarLink } from '@shared/models';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { UserService } from '@shared/services/user/user.service';
import { CreateUser } from '@shared/models/user-factory';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  user: any;

  public items: Array<NavBarLink> = [
    {
      name: 'Teachers',
      url: '/teachers'
    },
    {
      name: 'Students',
      url: '/students'
    },
    {
      name: 'Courses',
      url: '/courses'
    },
    {
      name: 'Groups',
      url: '/groups'
    },
    {
      name: 'Specialties',
      url: '/specialties'
    },
  ];

  isCollapsed = true;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuthenticated();

    const userFromStorage = JSON.parse(this.userService.getUserLocalStorage('user'));
    this.user = CreateUser(userFromStorage);
  }

  logOut() {
    this.authenticationService.logOut();
  }

  authenticatedVerify() {
    return this.authenticationService.isAuthenticated();
  }

  changeCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
