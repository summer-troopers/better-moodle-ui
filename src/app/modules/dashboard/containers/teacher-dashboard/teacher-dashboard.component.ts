import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  @Input() user;

  ngOnInit() {
    console.log(this.user);
  }
}
