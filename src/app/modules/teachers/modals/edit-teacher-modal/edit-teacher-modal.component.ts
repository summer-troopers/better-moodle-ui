import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Teacher } from '@shared/models/teacher';
import { CrudService } from '@shared/services/crud/crud.service';
import { TEACHERS_URL } from '@shared/constants/index';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html'
})
export class EditTeacherModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  userForm: FormGroup;

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

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    const formParam = this.userForm.value;
    this.crudService.editItem(TEACHERS_URL, formParam)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
