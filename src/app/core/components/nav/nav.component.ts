import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavBarLink } from '@shared/models';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@shared/constants';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { AuthenticationService } from '@modules/authentication/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean;
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
    }
  ];

  isCollapsed = true;

  constructor(private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

  logOut() {
    if (this.isAuthenticated) {
      this.localStorageService.deleteLocalStorage(USER_STORAGE_KEY);
      this.localStorageService.deleteLocalStorage(TOKEN_STORAGE_KEY);
      this.isAuthenticated = false;
      this.router.navigateByUrl('auth');
    }
  }

  authenticatedVerify() {
    return this.authenticationService.isAuthenticated();
  }

  changeCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
