<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Alert, AlertType } from '@shared/models/alert';

import { Admin } from '@shared/models/admin';
import { ADMINS_URL } from '@shared/constants';
import { CrudService } from '@shared/services/crud/crud.service';
import { UserService } from '@shared/services/user/user.service';
import { DashboardPageComponent } from '../../../dashboard/containers/dashboard-page/dashboard-page.component';

>>>>>>> error

@Component({
  selector: 'app-edit-admin-modal',
  templateUrl: './edit-admin-modal.component.html',
  styleUrls: ['./edit-admin-modal.component.scss'],
  providers: [DashboardPageComponent]
})
export class EditAdminModalComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }
=======
  user: Admin;

  isSubmitted = false;

  constructor(private crudService: CrudService,
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private dashboard: DashboardPageComponent) { }
>>>>>>> error

  ngOnInit() {
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
          this.userService.updateUser(formParam);
          this.hideConfirmationModal();
          this.dashboard.ngOnInit();
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
>>>>>>> error
}
