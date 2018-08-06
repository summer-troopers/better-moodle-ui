import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs'

import Teacher from '../../shared/models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  id: number;
  options = {
    headers: new HttpHeaders({
      'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUm9sZSI6ImFkbWluIiwidXNlciI6MSwiaWF0IjoxNTMzMTk1ODAzLCJleHAiOjE1MzQwNTk4MDN9.5inxYqamNT4br5rDtjNIEbw-ggWUYo1hV-GSdXUoNG8"
    })
  }

  constructor(private http: HttpClient,
    private api: BackendApiService) { }

  getTeachers(): Observable<Array<Teacher>> {
    return this.api.get(`teachers`)
      .pipe(map(result => result.data));
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.api.get(`teachers/${id}`)
      .pipe(first());
  }

  deleteTeacher(id: number): Observable<any> {
    this.id = id;
    return this.api.delete(`teachers/${id}`).pipe(first());
  }

  addTeacher(form: Teacher): Observable<any> {
    return this.api.post(`teachers`, form)
      .pipe(first());
  }

  editTeacher(form: Teacher): Observable<any> {
    return this.api.put(`teachers/${form.id}`, form)
      .pipe(first());
  }

}
