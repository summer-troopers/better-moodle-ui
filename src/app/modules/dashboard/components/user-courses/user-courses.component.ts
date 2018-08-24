import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { Course } from '@shared/models/course';
import { COURSES_URL, LABORATORY_URL, LABTASK_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';
import { DashboardService } from '@modules/dashboard/dashboard.service';

import { CrudService } from '@shared/services/crud/crud.service';
import { DownloadService } from '@shared/services/download/download.service';

import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  id: string;
  courses: Array<Course> = [];
  tasks;
  alerts: Alert[] = [];
  fileExists = true;

  @Input() user;

  options: UploaderOptions;
  file: UploadFile;
  uploadInput: EventEmitter<UploadInput>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dashboardService: DashboardService,
              private crudService: CrudService,
              private downloadService: DownloadService
  ) {
    this.options = {concurrency: 1, maxUploads: 3};
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {
    this.getAllCourses();
    this.getTasks();
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

  getTasks() {
    this.crudService.getItems(LABTASK_URL).subscribe(tasks => {
      this.tasks = tasks;
      console.log(this.tasks);
      return this.tasks;
    }, error1 => console.log(error1));
  }


  uploadReport(courseId): void {
    const token = localStorage.getItem('authorization');
    const ContentType = this.file.type;
    const uploadEvent: UploadInput = {
      type: 'uploadFile',
      url: 'http://localhost:80/api/v1/lab_reports',
      method: 'POST',
      headers: {token},
      data: {courseId, ContentType},
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

  uploadTask(courseId): void {
    const token = localStorage.getItem('authorization');
    const ContentType = this.file.type;
    const uploadEvent: UploadInput = {
      type: 'uploadFile',
      url: 'http://localhost:80/api/v1/lab_tasks',
      method: 'POST',
      headers: {token},
      data: {courseId, ContentType},
      fieldName: 'labTask',
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
    }
    console.log(output);
  }


  downloadTask(taskId) {
    this.crudService.getItem(LABTASK_URL, taskId, true)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});

          return throwError(error);
        }))
      .subscribe(data => {
        this.downloadService.downloadFile(data);
      });
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


  deleteTask(taskId) {
    console.log(taskId);
    this.crudService.deleteItem(LABTASK_URL, taskId)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});

          return throwError(error);
        }))
      .subscribe(data => {
        this.file = data;
      });
  }

}
