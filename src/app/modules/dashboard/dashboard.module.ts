import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

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

const COMPONENTS = [
  DashboardPageComponent,
  AdminDashboardComponent,
  StudentDashboardComponent,
  TeacherDashboardComponent,
  UserTeachersComponent,
  UserCoursesComponent,
  UserGroupsComponent,
  UserStudentsComponent,
  LabsListForTeacherComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    dashboardRoutes,
    SharedModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
  ],
  declarations: [
    ...COMPONENTS

  ]
})
export class DashboardModule {
}
