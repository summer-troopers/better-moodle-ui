import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  private subscription: any;
  currentUrl: string;
   isCollapsed = true;
   constructor(private router: Router) {
    this.subscription = router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
