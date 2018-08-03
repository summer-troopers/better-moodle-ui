import { Component, OnInit} from '@angular/core';
import { NavBarLink } from '../../../../shared/models/index';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public items: Array<NavBarLink> = [
    {
      name: 'My Teachers',
      url: '/teachers'
    },
    {
      name: 'My Courses',
      url: '/courses'
    },
    {
      name: 'My Groups',
      url: '/groups'
    },
    {
      name: 'My Specialties',
      url: '/specialties'
    },
  ];

  ngOnInit() {
  }
}
