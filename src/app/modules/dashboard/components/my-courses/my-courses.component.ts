import { Component, Input, OnInit } from '@angular/core';
import { CrudService } from '@shared/services/crud/crud.service';
import { COURSES_URL } from '@shared/constants';
import Course from '@shared/models/course';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  id: string;
  courses: Course;
  @Input() user;

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    const userId = this.user.id;
    this.crudService.getItemsofTeacher(COURSES_URL, userId);
  }
}
