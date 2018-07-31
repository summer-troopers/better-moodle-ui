import { Injectable } from '@angular/core';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { map } from '../../../../node_modules/rxjs/operators';
import { Observable } from '../../../../node_modules/rxjs';
import { Student } from '../../shared/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private api: BackendApiService) { }

  getStudents(): Observable<Array<Student>> {
    return this.api.get(`students`)
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

  editStudent(editedStudent) {
    return this.api.put(`students/${editedStudent.id}`, editedStudent)
      .pipe(map(result => result));
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
