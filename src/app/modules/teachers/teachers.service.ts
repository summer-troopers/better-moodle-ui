import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Teacher } from '@shared/models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  id: number;

  constructor(private http: HttpClient,
    private api: BackendApiService) {
  }

  getNumberOfTeachers() {
    return this.api.get(`teachers`)
      .pipe(map(result => result.total));
  }

  getTeachers(offset: number, limit: number): Observable<Array<Teacher>> {
    return this.api.get(`teachers?offset=${offset}&limit=${limit}`)
      .pipe(map(result => result.data));
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.api.get(`teachers/${id}`)
      .pipe(first());
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`teachers/${id}`).pipe(first());
  }

  addTeacher(form: Teacher): Observable<any> {
    return this.api.post(`teachers`, form)
      .pipe(map(result => result));
  }

  editTeacher(form: Teacher): Observable<any> {
    return this.api.put(`teachers/${form.id}`, form)
      .pipe(first());
  }

}
