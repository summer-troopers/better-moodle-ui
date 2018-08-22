import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { Student } from '@shared/models/student';
import { LABORATORY_URL, STUDENTS_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { CrudService } from '@shared/services/crud/crud.service';

@Component({
  selector: 'app-user-students',
  templateUrl: './user-students.component.html',
  styleUrls: ['./user-students.component.scss']
})
export class UserStudentsComponent implements OnInit, OnDestroy {
  id: string;
  students: Array<Student> = [];
  @Input() user;
  numberofItems: Array<number> = [];

  activeRowIndex: number;
  isShown = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private dashboardService: DashboardService,
              private crudService: CrudService) {
  }

  ngOnInit() {
    this.getAllStudents();
  }

  showStudentDoneLabs(index, id) {
    this.isShown = !this.isShown;
    this.activeRowIndex = index;
    this.id = id;
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
        this.getNumberofLabs();
      });
  }

  getNumberofLabs() {
    this.students.forEach((student) => {
      this.crudService.getNumberOfItems(`${LABORATORY_URL}?studentId=${student.id}`)
        .subscribe(number => {
          console.log(number);
          this.numberofItems = number;
        });
    });
  }
}
