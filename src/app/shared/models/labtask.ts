import Course from '@shared/models/course';
import { Teacher } from '@shared/models/teacher';

export default class LabTask {
  id?: string;
  teacherId?: string;
  courseId?: string;
  mongoFileId?: string;
  teacher?: Teacher;
  course?: Course;

  constructor() {
    this.teacherId = this.teacher.id;
    this.courseId = this.course.id;
  }
}
