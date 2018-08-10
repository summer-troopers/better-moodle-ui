import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { CoursesService } from '@modules/courses/courses.service';
import Course from '@shared/models/course';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-delete-course-modal',
  templateUrl: './delete-course-modal.component.html',
  styleUrls: ['./delete-course-modal.component.scss']
})
export class DeleteCourseModalComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  event: EventEmitter<any> = new EventEmitter();
  course: Course;
  message: string;

  alerts: Alert[] = [];

  constructor(public bsModalRef: BsModalRef,
              private coursesService: CoursesService,
              private router: Router) { }

  ngOnInit() { }

  confirmDelete() {
    this.coursesService.deleteCourse(this.course.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.message = "Successfully deleted";
        setTimeout(() => {
          this.bsModalRef.hide();
          this.router.navigate(['courses']);
        }, 1500);
      }, error => {
        this.message = "Error deleted";
        this.alerts.push({type: AlertType.Error, message: error});
        return console.error(error);
      });
  }

  declineDelete() {
    this.bsModalRef.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
