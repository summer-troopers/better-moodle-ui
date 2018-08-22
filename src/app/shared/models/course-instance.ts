import { Course } from '@shared/models/course';
import { Teacher } from '@shared/models/teacher';

export class CourseInstance {
  id?: string;
  teacher: Teacher;
  course: Course;

  constructor(data: any) {
    this.id = data.id;
    this.teacher = data.teacher;
    this.course = data.course;
  }
}
