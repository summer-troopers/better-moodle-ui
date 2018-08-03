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
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;

  constructor(private modalService: BsModalService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private teachersService: TeachersService) { }

  ngOnInit() {

    this.userForm = new FormGroup({
      data: new FormControl({
        firstName: this.teacher.firstName,
        lastName: this.teacher.lastName,
        email: this.teacher.email,
        phoneNumber: this.teacher.phoneNumber,
      }),

    });

    // this.firstName = this.userForm.value.data.firstName;
    // this.lastName = this.userForm.value.data.lastName;
    // this.email = this.userForm.value.data.email;
    // this.phoneNumber = this.userForm.value.data.phoneNumber;
    console.log(this.userForm.value.data)
  }

  get f() {

    return this.userForm.controls.data.value;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.userForm.invalid) {
    //   return;
    // }
    //const formParam = this.userForm.value.data;

    // this.teachersService.editTeacher(formParam).toPromise();
    //this.teachersService.getTeachers();
  }

}
