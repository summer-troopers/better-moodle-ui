import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPageComponent} from './containers/dashboard-page/dashboard-page.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {StudentDashboardComponent} from './components/student-dashboard/student-dashboard.component';
import {TeacherDashboardComponent} from './components/teacher-dashboard/teacher-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DashboardPageComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent
  ],
  exports: [
    DashboardPageComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent
  ],
})
export class DashboardModule {
}
