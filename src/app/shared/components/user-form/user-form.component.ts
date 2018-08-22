import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { ModalHelperService } from '@shared/services/modal-helper/modal-helper.service';
import { STUDENTS_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  onAdd: boolean;
  isStudent: boolean;

  userForm: FormGroup;
  isSubmitted = false;

  alerts: Alert[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  userAdded: EventEmitter<any> = new EventEmitter();

  confirmModalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
    private crudService: CrudService,
    public addModalRef: BsModalRef,
    private modalHelperService: ModalHelperService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      groupId: ['', Validators.required]
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

  get groupId() {
    return this.userForm.controls.groupId;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.crudService.addItem(STUDENTS_URL, this.userForm.value)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        })
      )
      .subscribe((newStudent) => {
        this.userAdded.emit(newStudent);
        this.addModalRef.hide();
      });
  }

  onClose() {
    if (this.modalHelperService.checkFormForData(this.userForm)) {
      this.confirmModalRef = this.modalHelperService.openConfirmLeaveModal();
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
