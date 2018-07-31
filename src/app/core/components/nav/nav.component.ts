import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUrl: string;
  isCollapsed = true;

  constructor() {}

  ngOnInit() {
  }

}
