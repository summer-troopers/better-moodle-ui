import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
@Component({
  selector: 'app-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html'
})
export class AddTeacherModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  public event: EventEmitter<any> = new EventEmitter();

  userForm: FormGroup;
  alerts: Alert[] = [];
  isSubmitted = false;

  pageUrl: string = 'teachers';

  constructor(private formBuilder: FormBuilder,
    private crudService: CrudService,
    public bsModalRef: BsModalRef) { }

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

    this.crudService.addItem(this.pageUrl, formParam)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return Observable.throw(error);
        })
      )
      .subscribe((newTeacher) => {
        this.event.emit(newTeacher);
        this.bsModalRef.hide();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
