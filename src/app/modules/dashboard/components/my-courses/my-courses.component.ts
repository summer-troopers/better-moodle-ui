import { Component, Input, OnInit } from '@angular/core';
import { COURSES_URL } from '@shared/constants';
import Course from '@shared/models/course';
import { DashboardService } from '@modules/dashboard/dashboard.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  id: string;
  courses: Course;
  @Input() user;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    const userId = this.user.id;
    this.dashboardService.getItemsofTeacher(COURSES_URL, userId);
  }
}
