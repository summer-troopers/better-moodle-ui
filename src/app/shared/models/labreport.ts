import { Student } from '@shared/models/student';
import LabTask from '@shared/models/labtask';

export default class LabReport {
  id?: string;
  studentId?: string;
  labTaskId?: string;
  mongoFileId?: string;
  student?: Student;
  labTask?: LabTask;

  constructor() {
  }
}
