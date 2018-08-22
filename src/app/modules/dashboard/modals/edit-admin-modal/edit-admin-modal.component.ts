import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Alert, AlertType } from '@shared/models/alert';

import { Admin } from '@shared/models/admin';
import { ADMINS_URL } from '@shared/constants';
import { CrudService } from '@shared/services/crud/crud.service';
import { UserService } from '@shared/services/user/user.service'

@Component({
  selector: 'app-edit-admin-modal',
  templateUrl: './edit-admin-modal.component.html',
  styleUrls: ['./edit-admin-modal.component.scss']
})
export class EditAdminModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  userForm: FormGroup;
  alerts: Alert[] = [];

  user: Admin;

  isSubmitted = false;

  constructor(private crudService: CrudService,
    public bsModalRef: BsModalRef,
    private userService: UserService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.user.id),
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.required),
      userRole: new FormControl(this.user.userRole)
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

  get phoneNumber() {
    return this.userForm.controls.phoneNumber;
  }

  onSubmit() {
    this.isSubmitted = true;

    // if (this.userForm.invalid) {
    //   return;
    // }

    const formParam = this.userForm.value;

    this.crudService.editItem(ADMINS_URL, formParam)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        })
      )
      .subscribe(
        succ => {
          this.userService.updateUser(formParam);
          // this.crudService.getItem(ADMINS_URL, formParam.id).
          //   pipe(takeUntil(this.destroy$)).subscribe(
          //     test => {
          //       this.user = test;
          //     }
          //   );


          this.hideConfirmationModal();
        },
        err => { });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  hideConfirmationModal(): void {
    this.bsModalRef.hide();
  }
}
