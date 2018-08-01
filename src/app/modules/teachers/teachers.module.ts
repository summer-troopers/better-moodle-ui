import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherDetailsPageComponent, TeachersPageComponent } from '@modules/teachers/containers';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';

import { teacherRoutes } from './teachers.routes';

@NgModule({
  imports: [
    CommonModule,
    AddTeacherComponent,
    teacherRoutes
  ],
  declarations: [TeacherDetailsPageComponent, TeachersPageComponent, AddTeacherComponent]
})
export class TeachersModule { }
