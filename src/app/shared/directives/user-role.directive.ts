import { Directive, OnInit, ElementRef, Input } from '@angular/core';

import { UserService } from '@shared/services/user/user.service';

@Directive({
  selector: '[appHasRole]'
})
export class UserRoleDirective implements OnInit {
  @Input('appHasRole') role: string;

  constructor(private userService: UserService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    const user = this.userService.getUser();

    if (user.userRole !== this.role) {
      const child: HTMLElement = this.elementRef.nativeElement;
      child.parentNode.removeChild(child);
    }

  }
}
