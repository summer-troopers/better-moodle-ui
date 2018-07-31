import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRoutes } from './students.routes';
import { StudentDetailsPageComponent, StudentsPageComponent, AddStudentComponent } from '@modules/students/containers';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    studentsRoutes
  ],
  declarations: [
    StudentDetailsPageComponent,
    StudentsPageComponent,
    AddStudentComponent
  ]
})
export class StudentsModule { }
