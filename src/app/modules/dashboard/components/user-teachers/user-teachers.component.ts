import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { Teacher } from '@shared/models/teacher';
import { TEACHERS_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';
import { DashboardService } from '@modules/dashboard/dashboard.service';

@Component({
  selector: 'app-user-teachers',
  templateUrl: './user-teachers.component.html',
})
export class UserTeachersComponent implements OnInit, OnDestroy {
  id: string;
  teachers: Array<Teacher> = [];
  @Input() user;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getAllTeachers();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAllTeachers() {
    const userId = this.user.id;
    this.dashboardService.getItemsOfStudent(TEACHERS_URL, userId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        })
      )
      .subscribe((teachers) => {
        this.teachers = teachers;
      });
  }
}
