import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { COURSES_URL } from '@shared/constants';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
})
export class AddCourseModalComponent implements OnInit, OnDestroy {

  courseForm: FormGroup;

  isSubmitted = false;

  addItemEvent: EventEmitter<any> = new EventEmitter();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private modalRef: BsModalRef
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  get nameError() {
    return this.courseForm.controls.name.errors;
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
      return;
    }
    this.crudService.addItem(COURSES_URL, this.courseForm.value).pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.addItemEvent.emit(response);
          this.closeModal();
        }, error => {
          this.addItemEvent.emit(error);
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
