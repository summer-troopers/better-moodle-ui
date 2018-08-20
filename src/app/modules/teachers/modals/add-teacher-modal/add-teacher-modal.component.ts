import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { Alert, AlertType } from '@shared/models/alert';
import { TEACHERS_URL } from '@shared/constants';

@Component({
  selector: 'app-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html'
})
export class AddTeacherModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  teacherAdded: EventEmitter<any> = new EventEmitter();

  userForm: FormGroup;
  alerts: Alert[] = [];
  isSubmitted = false;

  confirmModalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
    private crudService: CrudService,
    public addModalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get firstName() {
    return this.userForm.controls.firstName;
  }

  get lastName() {
    return this.userForm.controls.lastName;
  }

  get email() {
    return this.userForm.controls.email;
  }

  get password() {
    return this.userForm.controls.password;
  }

  get phoneNumber() {
    return this.userForm.controls.phoneNumber;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const formParam = this.userForm.value;

    this.crudService.addItem(TEACHERS_URL, formParam)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        })
      )
      .subscribe((newTeacher) => {
        this.teacherAdded.emit(newTeacher);
        this.addModalRef.hide();
      });
  }

  checkFormForData(): boolean {
    let hasData = false;
    if (this.userForm.value.firstName !== '' || this.userForm.value.lastName !== '' || this.userForm.value.email !== '' ||
      this.userForm.value.phoneNumber !== '' || this.userForm.value.password !== '') {
      hasData = true;
    }
    return hasData;
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
