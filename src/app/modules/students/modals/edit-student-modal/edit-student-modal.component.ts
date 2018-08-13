import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';
import { StudentDetailsPageComponent } from '@modules/students/containers';
import { Student } from '@shared/models/student';
import { Alert, AlertType } from '@shared/models/alert';


@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})
export class EditStudentModalComponent implements OnInit {
  studentForm: FormGroup;
  isSubmitted = false;
  student: Student;

  alerts: Alert[] = [];

  constructor(private modalService: BsModalService,
    private bsmodalRef: BsModalRef,
    private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentForm = new FormGroup({
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

    this.studentsService.updateStudentData(this.student.id, this.studentForm.value)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return Observable.throw(error);
        })
      )
      .subscribe(() => {
        this.event.emit(this.studentForm.value);
        this.bsModalRef.hide();
      });
  }
}
