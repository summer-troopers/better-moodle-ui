import { Component, Input, OnInit } from '@angular/core';
import { GROUPS_URL } from '@shared/constants';
import Group from '@shared/models/group';
import {DashboardService} from '@modules/dashboard/dashboard.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {
  id: string;
  groups: Group;
  @Input() user;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    const userId = this.user.id;
    this.dashboardService.getItemsofTeacher(GROUPS_URL, userId);
  }
}
