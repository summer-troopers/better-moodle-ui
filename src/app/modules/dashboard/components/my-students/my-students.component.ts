import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { Student } from '@shared/models/student';
import { GROUPS_URL, STUDENTS_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { CrudService } from '@shared/services/crud/crud.service';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss']
})
export class MyStudentsComponent implements OnInit, OnDestroy {
  id: string;
  students: Array<Student> = [];
  @Input() user;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private dashboardService: DashboardService,
              private crudService: CrudService) {
  }

  ngOnInit() {
    this.getAllStudents();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAllStudents() {
    const userId = this.user.id;
    this.dashboardService.getItemsOfTeacher(STUDENTS_URL, userId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});
          return throwError(error);
        })
      )
      .subscribe((students) => {
        this.students = students;
        for (let i = 0; i < students.length; i++) {
          this.crudService.getItem(GROUPS_URL, students[i].groupId).subscribe(group => {
            this.students[i].group = group;
          });
        }
      });
  }
}
