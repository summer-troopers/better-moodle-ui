import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRoutes } from './students.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap';

import { EditStudentModalComponent } from './modals/edit-student-modal/edit-student-modal.component';
import { AddStudentModalComponent } from './modals/add-student-modal/add-student-modal.component';
import { StudentDetailsPageComponent, StudentsPageComponent } from '@modules/students/containers';
import { DeleteStudentModalComponent } from './modals/delete-student-modal/delete-student-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    studentsRoutes
  ],
  declarations: [
    StudentDetailsPageComponent,
    StudentsPageComponent,
    AddStudentModalComponent,
    EditStudentModalComponent,
    DeleteStudentModalComponent
  ],
  entryComponents: [
    AddStudentModalComponent,
    EditStudentModalComponent,
    DeleteStudentModalComponent
  ]
})
export class StudentsModule { }
