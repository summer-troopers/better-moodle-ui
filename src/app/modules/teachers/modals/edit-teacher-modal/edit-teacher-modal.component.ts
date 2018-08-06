import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { TeachersService } from '@modules/teachers/teachers.service';
import Teacher from '../../../../shared/models/teacher';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.scss']
})
export class EditTeacherModalComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  teacher: Teacher;

  constructor(private teachersService: TeachersService,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.teacher.id),
      firstName: new FormControl(this.teacher.firstName, Validators.required),
      lastName: new FormControl(this.teacher.lastName, Validators.required),
      email: new FormControl(this.teacher.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.teacher.phoneNumber, Validators.required),
    });
  }

  get formErrors() {
    return this.userForm.controls;
  }

  get firstNameErrors() {
    return this.formErrors.firstName.errors;
  }

  get lastNameErrors() {
    return this.formErrors.lastName.errors;
  }

  get emailErrors() {
    return this.formErrors.email.errors;
  }

  get phoneNumberErrors() {
    return this.formErrors.phoneNumber.errors;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    const formParam = this.userForm.value;
    this.teachersService.editTeacher(formParam).subscribe();
  }

  showTeacher() {
    this.teachersService.getTeacher(this.userForm.value.id).subscribe();
  }
}