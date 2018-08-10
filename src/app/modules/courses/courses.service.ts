import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Course from '@shared/models/course';
import { BackendApiService } from '@core/services/api/backend-api.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  id: string;

  constructor(private api: BackendApiService) { }

  getNumberOfCourses() {
    return this.api.get(`courses`)
      .pipe(map(result => result.total));
  }

  getCourses(offset: number, limit: number): Observable<Array<Course>> {
    return this.api.get(`courses?offset=${offset}&limit=${limit}`)
      .pipe(map(result => result.data));
  }

  getCourse(courseId: string): Observable<Course> {
    return this.api.get(`courses/${courseId}`);
  }

  addCourse(newCourse: Course): Observable<any> {
    return this.api.post('courses', newCourse);
  }

  updateCourse(updatedCourse: Course): Observable<any> {
    return this.api.put(`courses/${updatedCourse.id}`, updatedCourse);
  }

  deleteCourse(id: string): Observable<any> {
    return this.api.delete(`courses/${id}`);
  }
}
