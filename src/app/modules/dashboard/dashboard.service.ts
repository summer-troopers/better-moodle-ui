import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CrudService } from '@shared/services/crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  downloadAlert: Subject<any> = new Subject<any>();

  constructor(private crudService: CrudService) {
  }

  getItemsOfTeacher(pageUrl: string, teacherId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?teacherId=${teacherId}`, 0, 50);
  }

  getItemsOfStudent(pageUrl: string, studentId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?studentId=${studentId}`, 0, 50);
  }
}
