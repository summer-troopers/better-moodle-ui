import { Injectable } from '@angular/core';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { map } from '../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private api: BackendApiService) { }

  getStudents() {
    return this.api.get(`students`).pipe(map(result => result.items));
  }

  getStudent(id: number) {
    return this.api.get(`students/${id}`).pipe(map(result => result));
  }

  addStudent(newStudent) {
    return this.api.post(`students`, newStudent)
      .pipe(map(result => result));
  }

  editStudent(id: number) {

  }

  deleteStudent(id: number) {

  }
}
