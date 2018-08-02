import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeacherDetailsPageComponent, TeachersPageComponent } from '@modules/teachers/containers';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { teacherRoutes } from './teachers.routes';
import { AddTeacherModalComponent } from './modals/add-teacher-modal/add-teacher-modal.component';
import { EditTeacherModalComponent } from './modals/edit-teacher-modal/edit-teacher-modal.component';

@NgModule({
  imports: [
    CommonModule,
    teacherRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  declarations: [TeacherDetailsPageComponent, TeachersPageComponent, AddTeacherComponent, AddTeacherModalComponent, EditTeacherModalComponent]
})
export class TeachersModule { }
