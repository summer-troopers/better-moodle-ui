import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BackendApiService } from '@core/services/api/backend-api.service';
import { Student } from '@shared/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private api: BackendApiService) { }

  getNumberOfStudents() {
    return this.api.get(`students`)
      .pipe(map(result => result.total));
  }

  getStudents(offset: number, limit: number): Observable<Array<Student>> {
    return this.api.get(`students?offset=${offset}&limit=${limit}`)
      .pipe(map(result => result.data));
  }

  getStudent(id: number): Observable<Student> {
    return this.api.get(`students/${id}`)
      .pipe(map(result => result));
  }

  addStudent(newStudent): Observable<any> {
    return this.api.post(`students`, newStudent)
      .pipe(map(result => result));
  }

  updateStudentData(id: number, editedStudent) {
    return this.api.put(`students/${id}`, editedStudent)
      .pipe(map(result => console.log(result)));
  }

  deleteStudent(id: number) {
    return this.api.delete(`students/${id}`)
      .pipe(map(result => result));
  }

  getStudentsGroup(groupId: number) {
    return this.api.get(`groups/${groupId}`)
      .pipe(map(result => result.name));
  }
}
