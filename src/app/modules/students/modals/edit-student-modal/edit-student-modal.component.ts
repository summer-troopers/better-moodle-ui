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


@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})
export class EditStudentModalComponent implements OnInit {
  studentForm: FormGroup;
  submitted = false;
  student: Student;

  alerts: Array<any> = [];

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

  openEditStudentModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  formErrors(inputName: string) {
    return this.studentForm.controls[inputName].errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentForm.invalid) {
      return;
    }

    this.studentsService.updateStudentData(this.student.id, this.studentForm.value)
      .catch(error => {
        this.alerts.push({ type: "danger", msg: error.message });
        return Observable.throw(error.message);
      })
      .subscribe(() => {
        this.event.emit(this.studentForm.value);
        this.bsModalRef.hide();
      });
  }
}
