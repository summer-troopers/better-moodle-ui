import { Component, OnInit } from '@angular/core';
import { NavBarLink } from '../../../../shared/models/index';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

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
