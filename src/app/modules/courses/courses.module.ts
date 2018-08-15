import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { coursesRoutes } from '@modules/courses/courses.routes';
import { AddCourseModalComponent } from '@modules/courses/components/add-course-modal/add-course-modal.component';
import { EditCourseModalComponent } from '@modules/courses/components/edit-course-modal/edit-course-modal.component';
import { SharedModule } from '@shared/shared.module';
import { CourseDetailsPageComponent, CoursesPageComponent } from './containers';

const COMPONENTS = [
  CoursesPageComponent,
  CourseDetailsPageComponent,
  AddCourseModalComponent,
  EditCourseModalComponent];

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
  exports: [],
  entryComponents: [
    AddCourseModalComponent,
    EditCourseModalComponent,
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class CoursesModule { }
