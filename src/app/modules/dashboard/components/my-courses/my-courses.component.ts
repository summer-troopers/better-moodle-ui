import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LABTASKS, GROUPS_URL, TEACHERS_URL, COURSES_URL} from '@shared/constants';
import {mergeMap} from 'rxjs/operators';

import {CrudService} from '@shared/services/crud/crud.service';
import Course from '@shared/models/course';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  id: string;
  course: Course;

  constructor(private crudService: CrudService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teacherId = params['teacherId'];
      this.crudService.getItem(COURSES_URL, this.teacherId)
        .pipe(
          mergeMap((course: Course) => {
            this.course = course;
            return this.crudService.getItem(TEACHERS_URL, course.teacherId.toString()),
          }),
        )
        .subscribe(teacher => this.firstName = teacher.firstName);
    });
  }
}
