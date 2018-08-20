import { Component, Input, OnInit } from '@angular/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { DashboardService } from '@modules/dashboard/dashboard.service';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { LABORATORY_URL } from '@shared/constants';

@Component({
  selector: 'app-labs-list-for-teacher',
  templateUrl: './labs-list-for-teacher.component.html',
  styleUrls: ['./labs-list-for-teacher.component.scss']
})
export class LabsListForTeacherComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  reports;
  @Input() user;
  @Input() students;

  alerts: Alert[] = [];

  constructor(private dashboardService: DashboardService,
              private crudService: CrudService) {
  }

  ngOnInit() {
    this.getAllReports();
  }

  getAllReports() {
    this.crudService.getItems(`${LABORATORY_URL}?studentId=${this.students.id}`, null, null)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});
          return throwError(error);
        })
      )
      .subscribe((reports) => {
        this.reports = reports;
        console.log(reports);
        console.log(this.students.id);
      });
  }
}
