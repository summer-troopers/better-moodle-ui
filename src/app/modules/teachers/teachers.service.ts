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
      'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUm9sZSI6ImFkbWluIiwidXNlciI6MSwiaWF0IjoxNTMzMTI5NTMxLCJleHAiOjE1MzM5OTM1MzF9.xgOTuxzz40bhs7D5TtN4-qbYvjPQga963qjMGDNQ3V4"
    })
  }

  constructor(private http: HttpClient,
    private api: BackendApiService) { }

  getTeachers(): Observable<Array<Teacher>> {
    return this.api.get(`teachers`, this.options)
      .pipe(map(result => result.data));
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.api.get(`teachers/${id}`, this.options)
      .pipe(map(result => result));
  }

  deleteTeacher(id: number): Observable<Teacher> {
    //debugger;
    return this.api.delete(`teachers/${id}`, this.options);
      //.pipe(map(result => result));
  }
}
