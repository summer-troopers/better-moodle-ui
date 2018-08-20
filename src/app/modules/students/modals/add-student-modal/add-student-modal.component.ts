import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { STUDENTS_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html'
})
export class AddStudentModalComponent implements OnInit, OnDestroy {
  studentForm: FormGroup;
  isSubmitted = false;

  alerts: Alert[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  studentAdded: EventEmitter<any> = new EventEmitter();

  confirmModalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
    private crudService: CrudService,
    public addModalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      groupId: ['', Validators.required]
    });
  }

  get firstName() {
    return this.studentForm.controls.firstName;
  }

  get lastName() {
    return this.studentForm.controls.lastName;
  }

  get email() {
    return this.studentForm.controls.email;
  }

  get password() {
    return this.studentForm.controls.password;
  }

  get phoneNumber() {
    return this.studentForm.controls.phoneNumber;
  }

  get groupId() {
    return this.studentForm.controls.groupId;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    this.crudService.addItem(STUDENTS_URL, this.studentForm.value)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        })
      )
      .subscribe((newStudent) => {
        this.studentAdded.emit(newStudent);
        this.addModalRef.hide();
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
    if (this.studentForm.value.firstName !== '' || this.studentForm.value.lastName !== '' || this.studentForm.value.email !== '' ||
      this.studentForm.value.phoneNumber !== '' || this.studentForm.value.password !== '' || this.studentForm.value.groupId !== '') {
      hasData = true;
    }
    return hasData;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
