import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { DashboardService } from '@modules/dashboard/dashboard.service';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { LAB_REPORTS_URL } from '@shared/constants';
import { DownloadService } from '@shared/services/download/download.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LabReportCommentModalComponent } from '@modules/dashboard/modals/lab-report-comment-modal/lab-report-comment-modal.component';
import { ViewLabReportCommentModalComponent } from '@modules/dashboard/modals/view-lab-report-comment-modal/view-lab-report-comment-modal.component';
import { LabReport } from '@shared/models/lab-report';

@Component({
  selector: 'app-labs-list-for-teacher',
  templateUrl: './labs-list-for-teacher.component.html',
  styleUrls: ['./labs-list-for-teacher.component.scss']
})
export class LabsListForTeacherComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() user;
  @Input() student;

  reports: Array<LabReport> = [];
  modalRef: BsModalRef;
  alerts: Alert[] = [];
  downloadAlertEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dashboardService: DashboardService,
              private crudService: CrudService,
              private downloadService: DownloadService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getAllReports();
  }

  openViewCommentModal(review) {
    const initialState = {
      review: review,
    };
    this.modalRef = this.modalService.show(ViewLabReportCommentModalComponent, {initialState});
  }

  openCommentAndMarkModal(reportId) {
    const initialState = {
      labReportId: reportId,
    };
    this.modalRef = this.modalService.show(LabReportCommentModalComponent, {initialState});
  }

  getAllReports() {
    this.crudService.getItems(`${LAB_REPORTS_URL}?studentId=${this.student.id}`)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});
          this.downloadAlertEvent.emit(this.dashboardService.downloadAlert.next(this.alerts));
          return throwError(error);
        })
      )
      .subscribe((reports) => {
        this.reports = reports;
      });
  }

  downloadReport(id) {
    this.crudService.getItem(LAB_REPORTS_URL, id, true)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});
          this.downloadAlertEvent.emit(this.dashboardService.downloadAlert.next(this.alerts));

          return throwError(error);
        }))
      .subscribe(data => {
        this.downloadService.downloadFile(data);
      });
  }
}
