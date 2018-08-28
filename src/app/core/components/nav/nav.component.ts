import { Component, OnInit } from '@angular/core';

import { NavBarLink } from '@shared/models';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { USER_STORAGE_KEY } from '@shared/constants';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  isCollapsed = true;

  userRole: String;

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

  constructor(private authenticationService: AuthenticationService,
    private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.getRole();
  }

  authenticatedVerify() {
    return this.authenticationService.isAuthenticated();
  }

  changeCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getRole() {
    const temp = JSON.parse(this.localStorage.getLocalStorage(USER_STORAGE_KEY));
    this.userRole = temp.userRole;
    return this.userRole;
  }
}
