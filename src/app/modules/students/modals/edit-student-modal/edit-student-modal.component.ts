import { Component, OnInit, TemplateRef, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs';
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
  @Input()
  student: Student;

  @Input()
  parent: StudentDetailsPageComponent;

  modalRef: BsModalRef;

  studentForm: FormGroup;
  submitted = false;

  alerts: Array<object> = [];

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      idGroup: ['', Validators.required]
    });
  }

  openModal(template: TemplateRef<any>) {
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
      .subscribe();

    this.parent.student = this.studentForm.value;

    this.modalRef.hide();
  }

  onClosed(dismissedError: any) {
    this.alerts = this.alerts.filter(error => error !== dismissedError);
  }
}
