import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StudentsService } from '@modules/students/students.service';

import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModalComponent implements OnInit {
  modalRef: BsModalRef;

  studentForm: FormGroup;
  submitted = false;

  errors: Array<any> = [];

  constructor(private formBuilder: FormBuilder,
    private api: StudentsService,
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

  get fields() {
    return this.studentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    this.api.addStudent(this.studentForm.value)
      .catch(error => {
        this.errors.push(error.message);
        return Observable.throw(error.message);
      })
      .subscribe();
  }

  onClosed(dismissedError: any) {
    this.errors = this.errors.filter(error => error !== dismissedError);
  }

}
