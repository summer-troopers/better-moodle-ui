import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModalComponent implements OnInit, OnDestroy {
  studentForm: FormGroup;
  submitted = false;

  alerts: Array<any> = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  public event: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      idGroup: [1, Validators.required]
    });
  }

  get firstName() {
    return this.studentForm.controls['firstName'].errors;
  }

  get lastName() {
    return this.studentForm.controls['lastName'].errors;
  }

  get email() {
    return this.studentForm.controls['email'].errors;
  }

  get password() {
    return this.studentForm.controls['password'].errors;
  }

  get phoneNumber() {
    return this.studentForm.controls['phoneNumber'].errors;
  }

  get idGroup() {
    return this.studentForm.controls['idGroup'].errors;
  }

  onSubmit() {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    this.studentsService.addStudent(this.studentForm.value)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: "danger", msg: error.message });
        return Observable.throw(error.message);
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
