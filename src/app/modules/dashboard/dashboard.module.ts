import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from '@modules/dashboard/dashboard.routes';

import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { AdminDashboardComponent } from './containers/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './containers/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './containers/teacher-dashboard/teacher-dashboard.component';
import { TabsModule } from 'ngx-bootstrap';
import { MyTeachersComponent } from './components/my-teachers/my-teachers.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { MySpecialtiesComponent } from './components/my-specialties/my-specialties.component';
import { MyGroupsComponent } from './components/my-groups/my-groups.component';
import { MyStudentsComponent } from './components/my-students/my-students.component';

const COMPONENTS = [
  DashboardPageComponent,
  AdminDashboardComponent,
  StudentDashboardComponent,
  TeacherDashboardComponent,
  MyTeachersComponent,
  MyCoursesComponent,
  MySpecialtiesComponent,
  MyGroupsComponent,
  MyStudentsComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    dashboardRoutes,
    TabsModule.forRoot(),
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class DashboardModule {
}
