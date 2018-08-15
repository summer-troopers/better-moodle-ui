import {Component, OnInit} from '@angular/core';

import {NavBarLink} from '@shared/models';
import {AuthenticationService} from '@modules/authentication/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  isCollapsed = true;

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

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

  authenticatedVerify() {
    return this.authenticationService.isAuthenticated();
  }

  changeCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
