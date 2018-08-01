import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public items: Array<string> = ['teachers', 'students', 'courses', 'groups', 'specialties'];

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
