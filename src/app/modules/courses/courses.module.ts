import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsPageComponent, CoursesPageComponent } from './containers';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { RouterModule } from '@angular/router';
import { coursesRoutes } from '@modules/courses/courses.routes';
import { AddCourseModalComponent } from './components/add-course-modal/add-course-modal.component';
import { EditCourseModalComponent } from './components/edit-course-modal/edit-course-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';
import { DeleteCourseModalComponent } from './components/delete-course-modal/delete-course-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    coursesRoutes,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [PaginationModule],
  entryComponents: [
    AddCourseModalComponent,
    EditCourseModalComponent,
    DeleteCourseModalComponent
  ],
  declarations: [
    CoursesPageComponent,
    CourseDetailsPageComponent,
    AddCourseComponent,
    AddCourseModalComponent,
    EditCourseModalComponent,
    DeleteCourseModalComponent
  ]
})
export class CoursesModule { }
