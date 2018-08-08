import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { first } from '../../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(public router: Router) { }

  handleEvents() {
    console.log(this.router.events.pipe(first()));
    // .subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     console.log(event);
    //   }
    // }
  };
}
