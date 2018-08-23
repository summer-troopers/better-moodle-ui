import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';
import { Alert, AlertType } from '@shared/models/alert';

import { EditAdminModalComponent } from '../../modals/edit-admin-modal/edit-admin-modal.component';
import { Admin } from '@shared/models/admin';
import { CrudService } from '@shared/services/crud/crud.service';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() user;

  serForm: FormGroup;
  alerts: Alert[] = [];
  admin: Admin;
  userForm: FormGroup;

  isSubmitted = false;

  modal: BsModalRef;

  constructor(private crudService: CrudService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.admin.id),
      firstName: new FormControl(this.admin.firstName, Validators.required),
      lastName: new FormControl(this.admin.lastName, Validators.required),
      email: new FormControl(this.admin.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.admin.phoneNumber, Validators.required),
    });
    console.log(this.userForm)
    //console.log(this.userForm.controls)
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

  openEditModal() {
    this.modal = this.modalService.show(EditAdminModalComponent);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.userForm.invalid) {

      return;
    }

    // const formParam = this.userForm.value;

    // this.crudService.editItem(TEACHERS_URL, formParam)
    //   .pipe(takeUntil(this.destroy$),
    //     catchError((error) => {
    //       this.alerts.push({ type: AlertType.Error, message: error });

    //       return throwError(error);
    //     })
    //   )
    //   .subscribe(() => {
    //     this.teacherEdited.emit(formParam);
    //     this.hideConfirmationModal();
    //   });
  }

  hideConfirmationModal(): void {
    this.modal.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.modal = this.modalService.show(EditAdminModalComponent, { initialState });
    this.modal.content.onChange.subscribe(
      test => {
        this.user = test;
      }
    );
  }
}
