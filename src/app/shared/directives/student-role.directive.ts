import { Directive, Input, OnInit, ElementRef, Renderer } from '@angular/core';

import { UserService } from '@shared/services/user/user.service';
import { USER_STORAGE_KEY } from '@shared/constants';

@Directive({
  selector: '[appHasRole]'
})
export class StudentRoleDirective implements OnInit {

  @Input() appHasRole: string;

  isVisible = false;

  constructor(private userService: UserService,
    private el: ElementRef,
    private renderer: Renderer) {
  }

  ngOnInit() {

    const user = this.userService.getUserLocalStorage(USER_STORAGE_KEY).userRole;
    console.log(user);
    if (user === 'teacher' || user === 'student') {
      this.renderer.setElementProperty(this.el.nativeElement.style, 'visibility', 'hidden');
    }
  }

}
