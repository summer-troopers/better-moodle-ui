import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StudentsService } from '@modules/students/students.service';
import { Student } from '../../../../shared/models/student';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})
export class EditStudentModalComponent implements OnInit {
  modalRef: BsModalRef;

  editStudentForm: FormGroup;
  submitted = false;
  student: Student;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private api: StudentsService) { }

  ngOnInit() {
    this.editStudentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      idGroup: [1, Validators.required]
    });
  }

  openModal(template: TemplateRef<any>, student: Student) {
    this.modalRef = this.modalService.show(template);
    this.student = student;
  }

  get fields() {
    return this.editStudentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editStudentForm.invalid) {
      return;
    }

    this.api.updateStudent(this.editStudentForm.value)
      .subscribe((response) => console.log(response));

  }

}
