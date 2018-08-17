import { Component, Input, OnInit } from '@angular/core';
import { LABORATORY_URL } from '@shared/constants';
import { catchError, takeUntil } from 'rxjs/operators';
import { Alert, AlertType } from '@shared/models/alert';
import { Subject, throwError } from 'rxjs';
import { DashboardService } from '@modules/dashboard/dashboard.service';

@Component({
  selector: 'app-labs-list-for-teacher',
  templateUrl: './labs-list-for-teacher.component.html',
  styleUrls: ['./labs-list-for-teacher.component.scss']
})
export class LabsListForTeacherComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  reports = [];
  @Input() user;
  @Input() students;

  alerts: Alert[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getAllReports();
  }

  getAllReports() {
    this.dashboardService.getItemsofRaports(LABORATORY_URL, this.students.id)
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
