import { Injectable } from '@angular/core';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { map } from '../../../../node_modules/rxjs/operators';
import { HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  options = {
    headers: new HttpHeaders({
      'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VyIjoxLCJpYXQiOjE1MzMwNDI5NTMsImV4cCI6MTUzMzkwNjk1M30.Pw3ed7GSJBnfOeWKM4uJigdICuFO0JRzBbSTpg8Pe2M"
    })
  }

  constructor(private api: BackendApiService) { }

  getStudents(): Observable<any> {
    return this.api.get(`students`, this.options)
      .pipe(map(result => result.data));
  }

  getStudent(id: number): Observable<any> {
    return this.api.get(`students/${id}`, this.options)
      .pipe(map(result => result));
  }

  addStudent(newStudent) {
    return this.api.post(`students`, newStudent, this.options)
      .pipe(map(result => result));
  }

  editStudent(editedStudent) {
    return this.api.put(`students/${editedStudent.id}`, editedStudent, this.options)
      .pipe(map(result => result));
  }

  deleteStudent(id: number) {
    return this.api.delete(`students/${id}`, this.options)
      .pipe(map(result => result));
  }

  getStudentsGroup(groupId: number) {
    return this.api.get(`groups/${groupId}`, this.options)
      .pipe(map(result => result.name));
  }
}
