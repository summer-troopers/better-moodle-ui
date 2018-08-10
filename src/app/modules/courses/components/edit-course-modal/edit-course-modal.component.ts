import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';

import { CoursesService } from '@modules/courses/courses.service';
import Course from '@shared/models/course';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-edit-course-modal',
  templateUrl: './edit-course-modal.component.html',
  styleUrls: ['./edit-course-modal.component.scss']
})
export class EditCourseModalComponent implements OnInit, OnDestroy  {
  destroy$: Subject<boolean> = new Subject<boolean>();

  course: Course;

  courseForm: FormGroup;

  isSubmitted = false;

  alerts: Alert[] = [];

  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.initForm();
  }

  get nameError() {
    return this.courseForm.controls['name'].errors;
  }

  initForm() {
    this.courseForm = this.formBuilder.group({
      id: [this.course.id],
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.courseForm.invalid) {
      console.error('EditCourse form is invalid');
      return;
    }

    this.coursesService.updateCourse(this.courseForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          console.log('Course modified!!!\nMessage: ' + response);
          this.event.emit(this.courseForm.value);
          this.hideConfirmationModal();
        }, (error) => {
          console.error('Course modification failed!!!\nMessage: ' + error);
          this.alerts.push({type: AlertType.Error, message: error});
          return console.error(error);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  hideConfirmationModal(): void {
    this.modalRef.hide();
  }
}
