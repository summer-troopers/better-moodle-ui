import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRoutes } from './students.routes';
import { StudentDetailsPageComponent, StudentsPageComponent, AddStudentComponent } from '@modules/students/containers';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AddStudentModalComponent } from './modals/add-student-modal/add-student-modal.component';
import { ModalModule } from 'ngx-bootstrap';

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
    AddStudentComponent,
    AddStudentModalComponent
  ]
})
export class StudentsModule { }
