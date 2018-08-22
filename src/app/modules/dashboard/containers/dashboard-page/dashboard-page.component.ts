import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }
}

