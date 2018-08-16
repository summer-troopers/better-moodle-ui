import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';

import Course from '@shared/models/course';
import { CrudService } from '@shared/services/crud/crud.service';
import { COURSES_URL } from '@shared/constants';

@Component({
  selector: 'app-edit-course-modal',
  templateUrl: './edit-course-modal.component.html',
})
export class EditCourseModalComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  course: Course;

  courseForm: FormGroup;

  isSubmitted = false;

  editItemEvent: EventEmitter<any> = new EventEmitter();

  constructor(private crudService: CrudService,
    private modalRef: BsModalRef) { }

  ngOnInit() {
    this.initForm();
  }

  get nameError() {
    return this.courseForm.controls.name.errors;
  }

  initForm() {
    this.courseForm = new FormGroup({
      id: new FormControl(this.course.id),
      name: new FormControl(this.course.name, Validators.required),
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.courseForm.invalid) {
      return;
    }

    this.crudService.editItem(COURSES_URL, this.courseForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.editItemEvent.emit(this.courseForm.value);
          this.hideConfirmationModal();
        }, error => {
          this.editItemEvent.emit(error);
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  hideConfirmationModal(): void {
    this.modalRef.hide();
  }
}
