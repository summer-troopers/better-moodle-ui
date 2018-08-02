import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoursesPageComponent, CourseDetailsPageComponent } from './containers';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { coursesRoutes } from '@modules/courses/courses.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    coursesRoutes
  ],
  declarations: [ CoursesPageComponent, CourseDetailsPageComponent, AddCourseComponent ]
})
export class CoursesModule { }
