import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { CrudService } from '@shared/services/crud/crud.service';
import { COURSE_INSTANCES_URL } from '@shared/constants';
import { catchError, takeUntil } from 'rxjs/operators';
import { Alert, AlertType } from '@shared/models/alert';
import { CourseInstance } from '@shared/models/course-instances';
import { UserService } from '@shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  courseInstances: Array<CourseInstance> = [];
  downloadAlert: Subject<any> = new Subject<any>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  alerts: Alert[] = [];

  constructor(private crudService: CrudService,
              private userService: UserService) {
  }

  get user() {
    return this.userService.getUser();
  }

  getItemsOfTeacher(pageUrl: string, teacherId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?teacherId=${teacherId}`, 0, 50);
  }

  getItemsOfStudent(pageUrl: string, studentId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?studentId=${studentId}`, 0, 50);
  }

  getAllCourseInstances() {
    const methodToCall = this.user.isTeacher() ?
      this.getItemsOfTeacher(COURSE_INSTANCES_URL, this.user.id) :
      this.getItemsOfStudent(COURSE_INSTANCES_URL, this.user.id);

    return methodToCall.pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        this.alerts.push({type: AlertType.Error, message: error});
        return throwError(error);
      })
    );
  }

}
