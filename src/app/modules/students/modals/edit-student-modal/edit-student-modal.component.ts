import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { throwError, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { STUDENTS_URL } from '@shared/constants';
import { Student } from '@shared/models/student';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html'
})
export class EditStudentModalComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  studentForm: FormGroup;
  isSubmitted = false;
  student: Student;

  alerts: Alert[] = [];

  studentEdited: EventEmitter<any> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
    private crudService: CrudService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.studentForm = new FormGroup({
      id: new FormControl(this.student.id, Validators.required),
      firstName: new FormControl(this.student.firstName, Validators.required),
      lastName: new FormControl(this.student.lastName, Validators.required),
      email: new FormControl(this.student.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.student.phoneNumber, Validators.required),
      groupId: new FormControl(this.student.groupId, Validators.required),
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

    this.crudService.editItem(STUDENTS_URL, this.studentForm.value)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.studentEdited.emit(this.studentForm.value);
        this.bsModalRef.hide();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
