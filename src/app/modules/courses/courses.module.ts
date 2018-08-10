import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { coursesRoutes } from '@modules/courses/courses.routes';
import { AddCourseModalComponent } from '@modules/courses/components/add-course-modal/add-course-modal.component';
import { EditCourseModalComponent } from '@modules/courses/components/edit-course-modal/edit-course-modal.component';
import { DeleteCourseModalComponent } from '@modules/courses/components/delete-course-modal/delete-course-modal.component';
import { SharedModule } from '@shared/shared.module';
import { CourseDetailsPageComponent, CoursesPageComponent } from './containers';

const COMPONENTS = [
  CoursesPageComponent,
  CourseDetailsPageComponent,
  AddCourseModalComponent,
  EditCourseModalComponent,
  DeleteCourseModalComponent];

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  ModalModule.forRoot(),
  PaginationModule.forRoot(),
  SharedModule];

@NgModule({
  imports: [
    ...MODULES,
    coursesRoutes,
  ],
  exports: [PaginationModule],
  entryComponents: [
    AddCourseModalComponent,
    EditCourseModalComponent,
    DeleteCourseModalComponent
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class CoursesModule { }
