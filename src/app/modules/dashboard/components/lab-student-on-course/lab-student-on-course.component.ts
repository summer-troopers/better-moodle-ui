import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab-student-on-course',
  templateUrl: './lab-student-on-course.component.html',
  styleUrls: ['./lab-student-on-course.component.scss']
})
export class LabStudentOnCourseComponent implements OnInit {

  @Input() isCollapsed;

  constructor() { }

  ngOnInit() {
  }

}
