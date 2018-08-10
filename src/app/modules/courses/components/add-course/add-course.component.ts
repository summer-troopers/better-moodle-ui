import { Component, OnInit } from '@angular/core';
import Course from '@shared/models/course';
import { CoursesService } from '@modules/courses/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit() {
  }

  addCourse() {
    const course: Course = {id: '1', name: 'SDA'};
    this.coursesService.addCourse(course).subscribe();
  }

}
