import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { map } from 'rxjs/operators';
import Teacher from '../../shared/models/teacher';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

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
      .pipe(map(result => result));
  }

  deleteTeacher(id: number): Observable<Teacher> {
    return this.api.delete(`teachers/${id}`);
  }

  addTeacher(form): Observable<any> {
    console.log(form)
    return this.api.post(`teachers`, form)
      .pipe(map(result => result));
  }

  editTeacher(form) {
    console.log(form)
    return this.api.put(`teachers/${form.id}`, form)
      .pipe(map(result => result));
  }

}
