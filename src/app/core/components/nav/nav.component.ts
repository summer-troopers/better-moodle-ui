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
      name: 'Teachers',
      url: '/teachers'
    },
    {
      name: 'Students',
      url: '/students'
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

  isCollapsed = true;

  changeCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
