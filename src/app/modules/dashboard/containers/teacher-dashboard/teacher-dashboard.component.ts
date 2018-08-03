import { Component, OnInit } from '@angular/core';
import { NavBarLink } from '@shared/models';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

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
