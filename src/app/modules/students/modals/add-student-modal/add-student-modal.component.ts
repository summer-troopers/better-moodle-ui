import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html'
})
export class AddStudentModalComponent implements OnInit, OnDestroy {
  studentForm: FormGroup;
  isSubmitted = false;

  alerts: Alert[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  public event: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      groupId: [, Validators.required]
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

  get password() {
    return this.studentForm.controls.password;
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

    this.studentsService.addStudent(this.studentForm.value)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: AlertType.Error, message: error });
        return Observable.throw(error);
      })
      .subscribe((newStudent) => {
        this.event.emit(newStudent);
        this.bsModalRef.hide();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
