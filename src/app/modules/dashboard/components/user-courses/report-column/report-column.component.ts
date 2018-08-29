import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { DownloadService } from '@shared/services/download/download.service';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { Subject, throwError } from 'rxjs';
import { LABORATORY_URL } from '@shared/constants';
import { catchError, takeUntil } from 'rxjs/operators';
import { UserCoursesComponent } from '@modules/dashboard/components/user-courses/user-courses.component';

@Component({
  selector: 'app-report-column',
  templateUrl: './report-column.component.html',
  styleUrls: ['./report-column.component.scss']
})
export class ReportColumnComponent implements OnInit {
  @Input() user;
  @Input() courseInstance;

  id: string;
  alerts: Alert[] = [];
  isDisabled = true;

  options: UploaderOptions;
  file: UploadFile;
  uploadInput: EventEmitter<UploadInput>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dashboardService: DashboardService,
              private crudService: CrudService,
              private downloadService: DownloadService,
              private userCoursesComponent: UserCoursesComponent,
  ) {
    this.options = {concurrency: 1, maxUploads: 3};
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {
  }

  uploadReport(courseInstanceId): void {
    const token = localStorage.getItem('authorization');
    const ContentType = this.file.type;
    const userId = this.user.id;
    const uploadEvent: UploadInput = {
      type: 'uploadFile',
      url: `http://localhost:80/api/v1/${LABORATORY_URL}`,
      method: 'POST',
      headers: {token},
      data: {courseInstanceId, userId, ContentType},
      fieldName: 'labReport',
      file: this.file,
    };
    this.uploadInput.emit(uploadEvent);

    const removeEvent: UploadInput = {
      type: 'remove',
      id: this.file.id,
    };
    this.uploadInput.emit(removeEvent);
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.file = output.file;
      this.isDisabled = false;
    } else if (output.type === 'done') {
      this.isDisabled = true;
      this.userCoursesComponent.ngOnInit();
    }
    console.log(output);
  }

  downloadReport(reportId) {
    this.crudService.getItem(LABORATORY_URL, reportId, true)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});

          return throwError(error);
        }))
      .subscribe(data => {
        this.downloadService.downloadFile(data);
      });
  }
}
