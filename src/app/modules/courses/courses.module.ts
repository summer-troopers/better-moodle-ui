import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { coursesRoutes } from '@modules/courses/courses.routes';
import { SharedModule } from '@shared/shared.module';
import { CourseDetailsPageComponent, CoursesPageComponent } from './containers';

const COMPONENTS = [
  CoursesPageComponent,
  CourseDetailsPageComponent];

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
  declarations: [
    ...COMPONENTS
  ]
})
export class CoursesModule { }
