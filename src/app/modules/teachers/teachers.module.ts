import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { TeacherDetailsPageComponent, TeachersPageComponent } from '@modules/teachers/containers';
import { teacherRoutes } from './teachers.routes';
import { SharedModule } from '@shared/shared.module';


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
  providers: [],
  declarations: [TeacherDetailsPageComponent, TeachersPageComponent]
})
export class TeachersModule { }
