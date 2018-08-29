import { Teacher } from '@shared/models/teacher';
import { Course } from '@shared/models/course';

export interface LabReport {
  id?: string;
  studentId?: string;
  courseInstanceId?:  {
    id: string;
    courseId: string;
    teacherId: string;
    course: Course;
    teacher: Teacher;
    fileExists: boolean;
  };
}
