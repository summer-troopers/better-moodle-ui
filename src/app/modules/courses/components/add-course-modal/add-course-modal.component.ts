import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CoursesService } from '@modules/courses/courses.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.scss']
})
export class AddCourseModalComponent implements OnInit, OnDestroy {

  courseForm: FormGroup;

  isSubmitted = false;

  event: EventEmitter<any> = new EventEmitter();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private modalRef: BsModalRef
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  get nameError() {
    return this.courseForm.controls['name'].errors;
  }

  initForm() {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.courseForm.invalid) {
      console.error('AddCourse form is invalid');
      return;
    }
    this.coursesService.addCourse(this.courseForm.value).pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          console.log('Course added!!!\nMessage: ' + response);
          this.event.emit(response);
          this.closeModal();
        }, (error) => {
          console.error('Course add failed!!!\nMessage: ' + error);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
