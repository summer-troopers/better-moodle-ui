import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
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
      id: new FormControl(this.student.id),
      firstName: new FormControl(this.student.firstName, Validators.required),
      lastName: new FormControl(this.student.lastName, Validators.required),
      email: new FormControl(this.student.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.student.phoneNumber, Validators.required),
      idGroup: new FormControl(this.student.idGroup, Validators.required),
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
    this.isSubmitted = true;
    if (this.studentForm.invalid) {
      return;
    }
    this.studentsService.updateStudentData(this.student.id, this.studentForm.value)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: AlertType.Error, message: error });
        return Observable.throw(error);
      })
      .subscribe(() => {
        this.event.emit(this.studentForm.value);
        this.bsModalRef.hide();
      });
  }
}
