import { Directive, OnInit, ElementRef, Input } from '@angular/core';

import { UserService } from '@shared/services/user/user.service';
import { CreateUser } from '@shared/models/user-factory';

@Directive({
  selector: '[appHasRole]'
})
export class UserRoleDirective implements OnInit {
  @Input('appHasRole') role = 'administrator';

  constructor(private userService: UserService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    const userFromStorage = this.userService.getUserLocalStorage('user');
    const user = CreateUser(userFromStorage);

    if (user.userRole !== this.role) {
      const child: HTMLElement = this.elementRef.nativeElement;
      child.parentNode.removeChild(child);
    }

  }
}
