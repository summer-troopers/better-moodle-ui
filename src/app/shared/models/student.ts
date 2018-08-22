import { User } from '@shared/models/user';
import { Group } from '@shared/models/group';
import { LabReport } from '@shared/models/lab-report';

export class Student extends User {
  group: Group;
  labReports?: Array<LabReport>;

  constructor(data: any) {
    super(data);
    this.group = data.group;
    this.labReports = data.labReports;
  }
}
