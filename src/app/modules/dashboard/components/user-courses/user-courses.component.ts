import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';

import { Course } from '@shared/models/course';
import { LabReport } from '@shared/models/labreport';
import { COURSES_URL, LABORATORY_URL, COURSE_INSTANCES_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';

import { DashboardService } from '@modules/dashboard/dashboard.service';
import { CrudService } from '@shared/services/crud/crud.service';
import { DownloadService } from '@shared/services/download/download.service';
import { Teacher } from '@shared/models/teacher';
import { CourseInstance } from '@shared/models/course-instances';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  id: string;
  courses: Array<Course> = [];
  courseInstances: Array<CourseInstance> = [];
  reports: Array<LabReport> = [];
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
    // this.getAllCourses();
    // this.getAllTasks();
    this.getAllCourseInstances();
    this.getAllReports();
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

  getAllCourseInstances() {
    const userId = this.user.id;

    const methodToCall = this.user.isTeacher() ?
      this.dashboardService.getItemsOfTeacher(COURSE_INSTANCES_URL, userId) :
      this.dashboardService.getItemsOfStudent(COURSE_INSTANCES_URL, userId);

    methodToCall.pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        this.alerts.push({type: AlertType.Error, message: error});
        return throwError(error);
      })
    )
      .subscribe((courseInstances) => {
        this.courseInstances = courseInstances;
      });
  }

  getAllTasks() {
    this.crudService.getItems(COURSE_INSTANCES_URL).subscribe(tasks => {
      this.tasks = tasks;
      console.log(this.tasks);
      return this.tasks;
    }, error1 => console.log(error1));
  }

  getAllReports() {
    this.crudService.getItems(LABORATORY_URL).subscribe(reports => {
      this.reports = reports;
      console.log(this.reports);
      return this.reports;
    }, error1 => console.log(error1));
  }

  uploadReport(courseId): void {
    const token = localStorage.getItem('authorization');
    const ContentType = this.file.type;
    const uploadEvent: UploadInput = {
      type: 'uploadFile',
      url: `http://localhost:80/api/v1/${LABORATORY_URL}`,
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

  uploadTask(courseInstanceId): void {
    const token = localStorage.getItem('authorization');
    const ContentType = this.file.type;
    const uploadEvent: UploadInput = {
      type: 'uploadFile',
      url: `http://localhost:80/api/v1/${COURSE_INSTANCES_URL}/${courseInstanceId}`,
      method: 'PUT',
      headers: {token},
      data: {ContentType},
      fieldName: 'labTasksFile',
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
    this.crudService.getItem(COURSE_INSTANCES_URL, taskId, true)
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
    this.crudService.deleteItem(COURSE_INSTANCES_URL, taskId)
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
