import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRoutes } from './students.routes';
import { StudentDetailsPageComponent, StudentsPageComponent } from '@modules/students/containers';
import { AddStudentComponent } from '@modules/students/components/add-student/add-student.component'

@NgModule({
  imports: [
    CommonModule,
    studentsRoutes
  ],
  declarations: [StudentDetailsPageComponent, StudentsPageComponent, AddStudentComponent]
})
export class StudentsModule { }
