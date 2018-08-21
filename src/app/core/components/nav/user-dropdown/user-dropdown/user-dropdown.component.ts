import {Component, Input, OnInit} from '@angular/core';
import {createUser} from '@shared/models/user-factory';
import { UserService } from '@shared/services/user/user.service';
import {AuthenticationService} from '@modules/authentication/authentication.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {
  @Input() isCollapsed;
  user: any;

  constructor( private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const userFromStorage = this.userService.getUserLocalStorage('user');
    this.user = createUser(userFromStorage);
  }

  logOut() {
    this.authenticationService.logOut();
  }
}
