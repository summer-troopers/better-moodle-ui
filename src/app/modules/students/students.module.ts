import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentsRoutes } from './students.routes';
import { StudentDetailsPageComponent, StudentsPageComponent } from './containers';

@NgModule({
  imports: [
    CommonModule,
    studentsRoutes
  ],
  declarations: [StudentDetailsPageComponent, StudentsPageComponent]
})
export class StudentsModule { }
