import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user/user.service';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { Alert } from '@shared/models/alert';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  user: any;
  alert: Alert[] = [];

  constructor(private userService: UserService,
              private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.dashboardService.downloadAlert.subscribe(result => {
      this.alert = result;
    });
  }
}

