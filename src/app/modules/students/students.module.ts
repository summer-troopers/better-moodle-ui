import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRoutes } from './students.routes';
import { StudentDetailsPageComponent, StudentsPageComponent } from '@modules/students/containers';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddStudentModalComponent } from './modals/add-student-modal/add-student-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { EditStudentModalComponent } from './modals/edit-student-modal/edit-student-modal.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule.forRoot(),
    ModalModule.forRoot(),
    studentsRoutes
  ],
  declarations: [
    StudentDetailsPageComponent,
    StudentsPageComponent,
    AddStudentModalComponent,
    EditStudentModalComponent
  ]
})
export class StudentsModule { }
