import { Directive, OnInit, ElementRef } from '@angular/core';

import { UserService } from '@shared/services/user/user.service';
import { USER_STORAGE_KEY } from '@shared/constants';

@Directive({
  selector: '[appHasStudentRole]'
})
export class StudentRoleDirective implements OnInit{

  constructor(private userService: UserService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    const user = this.userService.getUserLocalStorage(USER_STORAGE_KEY).userRole;
    if (user === 'admin' || user === 'teacher') {
      const child: HTMLElement = this.elementRef.nativeElement;
      child.parentNode.removeChild(child);
    }
  }

}
