import { Student } from '@shared/models/student';
import LabTask from '@shared/models/labtask';

export default class LabReport {
  id?: string;
  studentId?: string;
  labTaskId?: string;
  student?: Student;
  labTask?: LabTask;

  constructor(labReport: any) {
    this.id = labReport.id;
    this.studentId = labReport.studentId;
    this.labTaskId = labReport.labTaskId;
    this.student = labReport.student;
    this.labTask = labReport.labTask;
  }
}
