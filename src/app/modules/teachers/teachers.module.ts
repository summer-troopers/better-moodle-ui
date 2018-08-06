import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TeacherDetailsPageComponent, TeachersPageComponent } from '@modules/teachers/containers';
import { teacherRoutes } from './teachers.routes';
import { AddTeacherModalComponent } from './modals/add-teacher-modal/add-teacher-modal.component';
import { EditTeacherModalComponent } from './modals/edit-teacher-modal/edit-teacher-modal.component';
import { DeleteTeacherModalComponent } from './modals/delete-teacher-modal/delete-teacher-modal.component';

const COMPONENTS = [
  AddTeacherModalComponent,
  EditTeacherModalComponent,
  DeleteTeacherModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    teacherRoutes,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [...COMPONENTS],
  providers: [],
  declarations: [TeacherDetailsPageComponent, TeachersPageComponent, ...COMPONENTS]
})
export class TeachersModule { }
