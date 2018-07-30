import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent, CourseDetailsPageComponent } from './containers';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { RouterModule } from '@angular/router';
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
