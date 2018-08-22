import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import Course from '@shared/models/group';
import { COURSES_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';
import { DashboardService } from '@modules/dashboard/dashboard.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  id: string;
  courses: Array<Course> = [];
  @Input() user;

  fileExists = true;

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

    const methodToCall = this.user.isTeacher() ?
      this.dashboardService.getItemsOfTeacher(COURSES_URL, userId) :
      this.dashboardService.getItemsOfStudent(COURSES_URL, userId);

    methodToCall.pipe(
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

  deleteTask() {
  }

  deleteReport() {
  }

  downloadTask(fileData) {
  }

  downloadReport(fileData) {
  }

  uploadTask(event) {
    console.log(event);
  }

  uploadReport(event) {
    console.log(event);
  }
}
