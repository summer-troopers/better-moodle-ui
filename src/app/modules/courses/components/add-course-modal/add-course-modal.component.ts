import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
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

  confirmModalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
    private crudService: CrudService,
    private addModalRef: BsModalRef,
    private modalService: BsModalService) { }

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

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.courseForm.invalid) {
      return;
    }
    this.crudService.addItem(COURSES_URL, this.courseForm.value).pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.addItemEvent.emit(response);
          this.addModalRef.hide();
        }, error => {
          this.addItemEvent.emit(error);
        });
  }

  openConfirmLeaveModal() {
    if (this.checkFormForData()) {
      this.confirmModalRef = this.modalService.show(ConfirmModalComponent);
      this.confirmModalRef.content.onConfirm.pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.confirmModalRef.hide();
          this.addModalRef.hide();
        });
    } else {
      this.addModalRef.hide();
    }
  }

  checkFormForData(): boolean {
    let hasData = false;
    if (this.courseForm.value.name !== '') {
      hasData = true;
    }
    return hasData;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
