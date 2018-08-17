import Course from '@shared/models/course';
import { Teacher } from '@shared/models/teacher';

export default class LabTask {
  id?: string;
  teacherId?: string;
  courseId?: string;
  teacher?: Teacher;
  course?: Course;

  constructor() {
  }
}
