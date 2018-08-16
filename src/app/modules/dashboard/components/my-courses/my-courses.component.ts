import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import Course from '@shared/models/group';
import { COURSES_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';
import { DashboardService } from '@modules/dashboard/dashboard.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit, OnDestroy {
  id: string;
  courses: Array<Course> = [];
  @Input() user;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getAllCourses();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAllCourses() {
    const userId = this.user.id;

    if (this.user.isStudent()) {
      this.dashboardService.getItemsOfStudent(COURSES_URL, userId)
        .pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            this.alerts.push({type: AlertType.Error, message: error});
            return throwError(error);
          })
        )
        .subscribe((courses) => {
          this.courses = courses;
        });
    }

    if (this.user.isTeacher()) {
      this.dashboardService.getItemsOfTeacher(COURSES_URL, userId)
        .pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            this.alerts.push({type: AlertType.Error, message: error});
            return throwError(error);
          })
        )
        .subscribe((courses) => {
          this.courses = courses;
        });
    }
  }
}
