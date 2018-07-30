import {Component, OnInit} from '@angular/core';
import {NavBarLink} from '@shared/models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public items: Array<NavBarLink> = [
    {
      name: 'Teacher',
      url: '/teacher'
    },
    {
      name: 'Student',
      url: '/student'
    },
    {
      name: 'Courses',
      url: '/courses'
    },
    {
      name: 'Groups',
      url: '/groups'
    },
    {
      name: 'Specialties',
      url: '/specialties'
    }
  ];

  currentUrl: string;
  isCollapsed = true;

  constructor() {
  }

  ngOnInit() {
  }

  changeCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
