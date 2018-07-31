import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRoutes } from './students.routes';
import { StudentDetailsPageComponent, StudentsPageComponent } from '@modules/students/containers';

@NgModule({
  imports: [
    CommonModule,
    studentsRoutes
  ],
  declarations: [StudentDetailsPageComponent, StudentsPageComponent]
})
export class StudentsModule { }
