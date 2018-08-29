import { Student } from '@shared/models/student';
import { CourseInstance } from '@shared/models/course-instance';

export class LabReport {
  id?: string;
  student?: Student;
  courseInstance: CourseInstance;
  review: string;
  mark: number;

  constructor(data: any) {
    this.id = data.id;
    this.student = data.student;
    this.courseInstance = data.courseInstance;
    this.review = data.review;
    this.mark = data.mark;
  }
}
