import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}


/*

import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminsService} from '@modules/students/admins.service';
import {Admin} from '../../../../shared/models/admin';
// import {Subscription} from '../../../../../../node_modules/rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private adminsService: AdminsService) {
  }

  ngOnInit() {
    this.subscription = this.adminsService.getAdmin()
      .subscribe(admin => this.admin = admin);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
*/
