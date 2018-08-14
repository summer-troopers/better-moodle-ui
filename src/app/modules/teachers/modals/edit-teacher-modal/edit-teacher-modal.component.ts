import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { Teacher } from '@shared/models/teacher';
import { CrudService } from '@shared/services/crud/crud.service';
import { TEACHERS_URL } from '@shared/constants/index';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html'
})
export class EditTeacherModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  event: EventEmitter<any> = new EventEmitter();

  userForm: FormGroup;
  alerts: Alert[] = [];

  isSubmitted = false;
  teacher: Teacher;

  constructor(private crudService: CrudService,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.teacher.id),
      firstName: new FormControl(this.teacher.firstName, Validators.required),
      lastName: new FormControl(this.teacher.lastName, Validators.required),
      email: new FormControl(this.teacher.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.teacher.phoneNumber, Validators.required),
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
    this.crudService.editItem(TEACHERS_URL, formParam)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        })
      )
      .subscribe(() => {
        this.event.emit(this.userForm.value);
        this.hideConfirmationModal();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  hideConfirmationModal(): void {
    this.bsModalRef.hide();
  }
}
