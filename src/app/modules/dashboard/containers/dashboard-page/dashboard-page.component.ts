import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.user = this.dashboardService.user;
    this.dashboardService.downloadAlert.subscribe(result => {
      this.alert = result;
    });
  }
}

