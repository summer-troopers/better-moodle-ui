import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { DashboardService } from '@modules/dashboard/dashboard.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit, OnDestroy {
  id: string;
  courseInstances: any;

  @Input() user;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dashboardService.getAllCourseInstances()
      .subscribe((courseInstances) => {
        this.courseInstances = courseInstances;
        courseInstances.forEach(courseInstance => {
          courseInstance.labReport = courseInstance.labReports.find(labReport => labReport.studentId === this.user.id);
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
