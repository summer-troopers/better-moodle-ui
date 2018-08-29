import { Teacher } from '@shared/models/teacher';
import { Course } from '@shared/models/course';

export interface CourseInstance {
  id: string;
  courseId: string;
  teacherId: string;
  course: Course;
  teacher: Teacher;
  fileExists: boolean;
}
