<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { Admin } from '@shared/models/admin';
import { ADMINS_URL, USER_STORAGE_KEY } from '@shared/constants';
import { CrudService } from '@shared/services/crud/crud.service';
import { UserService } from '@shared/services/user/user.service';
import { Alert, AlertType } from '@shared/models/alert';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

<<<<<<< HEAD
>>>>>>> error

=======
>>>>>>> del space
@Component({
  selector: 'app-edit-admin-modal',
  templateUrl: './edit-admin-modal.component.html'
})
<<<<<<< HEAD
export class EditAdminModalComponent implements OnInit {
=======
export class EditAdminModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  onChange: Subject<any> = new Subject<any>();

  userForm: FormGroup;
  alerts: Alert[] = [];
>>>>>>> fix error

<<<<<<< HEAD
  constructor() { }
=======
  user: Admin;

  isSubmitted = false;

  constructor(private crudService: CrudService,
    public bsModalRef: BsModalRef,
<<<<<<< HEAD
<<<<<<< HEAD
    private userService: UserService,
    private dashboard: DashboardPageComponent) { }
>>>>>>> error
=======
    private userService: UserService) { }
>>>>>>> fix error
=======
    private userService: UserService,
    private localStorage: LocalStorageService) { }
>>>>>>> fix

  ngOnInit() {
<<<<<<< HEAD
=======
    this.initProfileForm();
  }

  initProfileForm() {
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
>>>>>>> fix few errors
  }

<<<<<<< HEAD
=======
  get phoneNumber() {
    return this.userForm.controls.phoneNumber;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.invalid) {
      return;
    }

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
          this.localStorage.insertLocalStorage(formParam, USER_STORAGE_KEY);
          this.onChange.next(this.userService.updateUser(formParam));
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
>>>>>>> error
}
