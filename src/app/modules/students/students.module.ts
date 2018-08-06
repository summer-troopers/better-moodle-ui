import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRoutes } from './students.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';

import { EditStudentModalComponent } from './modals/edit-student-modal/edit-student-modal.component';
import { AddStudentModalComponent } from './modals/add-student-modal/add-student-modal.component';
import { StudentDetailsPageComponent, StudentsPageComponent } from '@modules/students/containers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    studentsRoutes
  ],
  declarations: [
    StudentDetailsPageComponent,
    StudentsPageComponent,
    AddStudentModalComponent,
    EditStudentModalComponent
  ],
  entryComponents: [
    AddStudentModalComponent,
    EditStudentModalComponent
  ]
})
export class StudentsModule { }
