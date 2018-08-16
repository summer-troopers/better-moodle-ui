import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import Specialty from '@shared/models/group';
import { SPECIALTIES_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';
import { DashboardService } from '@modules/dashboard/dashboard.service';

@Component({
  selector: 'app-my-specialties',
  templateUrl: './my-specialties.component.html',
  styleUrls: ['./my-specialties.component.scss']
})
export class MySpecialtiesComponent implements OnInit, OnDestroy {
  id: string;
  specialties: Array<Specialty> = [];
  @Input() user;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getAllSpecialties();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getAllSpecialties() {
    const userId = this.user.id;
    this.dashboardService.getItemsofTeacher(SPECIALTIES_URL, userId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});
          return throwError(error);
        })
      )
      .subscribe((specialties) => {
        this.specialties = specialties;
      });
  }
}
