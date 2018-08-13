import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { TeacherDetailsPageComponent, TeachersPageComponent } from '@modules/teachers/containers';
import { teacherRoutes } from './teachers.routes';
import { AddTeacherModalComponent } from '@teacherModals/add-teacher-modal/add-teacher-modal.component';
import { EditTeacherModalComponent } from '@teacherModals/edit-teacher-modal/edit-teacher-modal.component';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [
  AddTeacherModalComponent,
  EditTeacherModalComponent,
];

@NgModule({
  imports: [
    CommonModule,
    teacherRoutes,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  entryComponents: [...COMPONENTS],
  providers: [],
  declarations: [TeacherDetailsPageComponent, TeachersPageComponent, ...COMPONENTS]
})
export class TeachersModule { }
