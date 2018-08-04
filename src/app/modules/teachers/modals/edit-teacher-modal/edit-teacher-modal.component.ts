import { Component, OnInit } from '@angular/core'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TeachersService } from '@modules/teachers/teachers.service';
import Teacher from '../../../../shared/models/teacher';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.scss']
})
export class EditTeacherModalComponent implements OnInit {

  modalRef: BsModalRef;

  userForm: FormGroup;
  submitted = false;
  teacher: Teacher;

  constructor(private teachersService: TeachersService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.teacher.id),
      firstName: new FormControl(this.teacher.firstName, Validators.required),
      lastName: new FormControl(this.teacher.lastName, Validators.required),
      email: new FormControl(this.teacher.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.teacher.phoneNumber, Validators.required),
    });

    console.log(this.userForm)
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    const formParam = this.userForm.value;
    this.teachersService.editTeacher(formParam).toPromise();
  }

  getTeacher() {
    this.teachersService.getTeacher(this.userForm.value.id).toPromise();;
  }

}
