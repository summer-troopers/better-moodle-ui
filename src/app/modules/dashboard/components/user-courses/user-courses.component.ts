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
  alerts: Alert[] = [];
  fileExists = true;
  @Input() user;

  options: UploaderOptions;
  file: UploadFile;
  uploadInput: EventEmitter<UploadInput>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dashboardService: DashboardService,
              private crudService: CrudService,
              private downloadService: DownloadService,
  ) {

    this.options = {concurrency: 1, maxUploads: 3};
    this.uploadInput = new EventEmitter<UploadInput>();
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


  uploadReport() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUm9sZSI6ImFkbWluIiwidXNlciI6MSwiaWF0IjoxNTM0Nzc5OTczLCJleHAiOjE1MzU2NDM5NzN9._Qj4Y8OlrC2dxyQFDz7muqOBRLIyYxnz6hQnXaT7OBE';  // <----  get token
    const event: UploadInput = {
      type: 'uploadFile',
      url: 'http://localhost:80/api/v1/lab_reports',
      method: 'POST',
      headers: {token},  // <----  set headers
      data: {courseId: '1'},
      fieldName: 'labReport',
      file: this.file,
    };
    console.log(event);
    this.uploadInput.emit(event);
  }

  uploadTask(): void {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUm9sZSI6ImFkbWluIiwidXNlciI6MSwiaWF0IjoxNTM0Nzc5OTczLCJleHAiOjE1MzU2NDM5NzN9._Qj4Y8OlrC2dxyQFDz7muqOBRLIyYxnz6hQnXaT7OBE';  // <----  get token
    const event: UploadInput = {
      type: 'uploadFile',
      url: 'http://localhost:80/api/v1/lab_tasks',
      method: 'POST',
      headers: {token},  // <----  set headers
      data: {courseId: '1'},
      fieldName: 'labTask',
      file: this.file,
    };
    console.log(event);
    this.uploadInput.emit(event);
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output);
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.file = output.file;
    }
    console.log(this.file);
  }

  downloadTask(id) {
    this.crudService.getItem(LABTASK_URL, id, true)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: error});

          return throwError(error);
        }))
      .subscribe(data => {
        this.downloadService.downloadFile(data);
      });
  }

  downloadReport(id) {
    this.crudService.getItem(LABORATORY_URL, id, true)
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
