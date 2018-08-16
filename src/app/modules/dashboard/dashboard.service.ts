import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '@shared/services/crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private crudService: CrudService) {
  }

  getItemsofTeacher(pageUrl: string, teacherId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?teacherId=${teacherId}`, null, null);
  }

  getItemsofStudent(pageUrl: string, studentId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?studentId=${studentId}`, null, null);
  }

  getItemsofGroup(pageUrl: string, groupId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?groupId=${groupId}`, null, null);
  }

  getItemsofSpecialty(pageUrl: string, specialtyId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?specialtyId=${specialtyId}`, null, null);
  }

  getItemsofCourse(pageUrl: string, courseId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?courseId=${courseId}`, null, null);
  }

  getItemsofLabTasks(pageUrl: string, taskId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?taskId=${taskId}`, null, null);
  }

  getItemsofLabReports(pageUrl: string, laboratoryId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?laboratoryId=${laboratoryId}`, null, null);
  }

  getItemsofComments(pageUrl: string, commentId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?commentId=${commentId}`, null, null);
  }
}
