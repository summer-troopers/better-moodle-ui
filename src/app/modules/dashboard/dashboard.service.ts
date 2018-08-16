import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '@shared/services/crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private crudService: CrudService) {
  }

  getItemsOfTeacher(pageUrl: string, teacherId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?teacherId=${teacherId}`, null, null);
  }

  getItemsOfStudent(pageUrl: string, studentId: number): Observable<Array<any>> {
    return this.crudService.getItems(`${pageUrl}?studentId=${studentId}`, null, null);
  }
}
