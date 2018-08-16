import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap';

import { dashboardRoutes } from '@modules/dashboard/dashboard.routes';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { AdminDashboardComponent } from './containers/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './containers/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './containers/teacher-dashboard/teacher-dashboard.component';
import { MyTeachersComponent } from './components/my-teachers/my-teachers.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { MyGroupsComponent } from './components/my-groups/my-groups.component';
import { MyStudentsComponent } from './components/my-students/my-students.component';
import { MyLaboratoriesComponent } from './components/my-laboratories/my-laboratories/my-laboratories.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks/my-tasks.component';

const COMPONENTS = [
  DashboardPageComponent,
  AdminDashboardComponent,
  StudentDashboardComponent,
  TeacherDashboardComponent,
  MyTeachersComponent,
  MyCoursesComponent,
  MyGroupsComponent,
  MyStudentsComponent,
  MyLaboratoriesComponent,
  MyTasksComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    dashboardRoutes,
    TabsModule.forRoot(),
  ],
  declarations: [
    ...COMPONENTS,
  ]
})
export class DashboardModule {
}
