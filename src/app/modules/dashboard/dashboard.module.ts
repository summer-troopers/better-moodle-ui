import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule, TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUploaderModule } from 'ngx-uploader';

import { dashboardRoutes } from '@modules/dashboard/dashboard.routes';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { AdminDashboardComponent } from './containers/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './containers/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './containers/teacher-dashboard/teacher-dashboard.component';
import { UserTeachersComponent } from './components/user-teachers/user-teachers.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { UserGroupsComponent } from './components/user-groups/user-groups.component';
import { UserStudentsComponent } from './components/user-students/user-students.component';
import { SharedModule } from '@shared/shared.module';
import { LabsListForTeacherComponent } from '@modules/dashboard/components/labs-list-for-teacher/labs-list-for-teacher.component';
import { LabReportCommentModalComponent } from './modals/lab-report-comment-modal/lab-report-comment-modal.component';
import { ViewLabReportCommentModalComponent } from './modals/view-lab-report-comment-modal/view-lab-report-comment-modal.component';
import { TaskColumnComponent } from './components/user-courses/task-column/task-column.component';
import { ReportColumnComponent } from './components/user-courses/report-column/report-column.component';

const COMPONENTS = [
  DashboardPageComponent,
  AdminDashboardComponent,
  StudentDashboardComponent,
  TeacherDashboardComponent,
  UserTeachersComponent,
  UserCoursesComponent,
  UserGroupsComponent,
  UserStudentsComponent,
  LabsListForTeacherComponent,
  ViewLabReportCommentModalComponent,
  LabReportCommentModalComponent,
  TaskColumnComponent,
  ReportColumnComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    dashboardRoutes,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule.forRoot(),
    NgxUploaderModule,
    ModalModule.forRoot(),
    RatingModule,
  ],
  entryComponents: [
    LabReportCommentModalComponent,
    ViewLabReportCommentModalComponent
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class DashboardModule {
}
